import { Request, Response } from "express";

import { random_product } from "@helpers/random_product";
import { random_prize } from "@helpers/random_prize";
import { pool } from "@database/db";
import { PrizeName, User } from "@types";

export const spinWheel = async (
	req: Request<any, any, { user: User }>,
	res: Response<{ msg?: string; error?: string; product_name?: string; prize?: string }>,
): Promise<Response<{ msg?: string; error?: string; product_name?: string; prize?: string }>> => {
	try {
		let user: User = req.body.user;
		user.user_wheels = Number(user.user_wheels);

		if (user.user_wheels <= 0) {
			return res.status(401).json({
				error: "You have not enough wheels for spin.",
			});
		}

		let prize: PrizeName = random_prize();

		async function return_data(product_name?: string): Promise<Response> {
			return res.status(200).json({
				product_name: product_name || null,
				prize: prize,
			});
		}

		switch (prize) {
			case "books":
				let book_name: string = await random_product("products_books");
				let books: Array<string> = [...user.user_books];
				if (!books.includes(book_name)) {
					books.push(book_name);
				}
				await pool.query(`UPDATE Users SET (user_books, user_wheels) = ($1, $2) WHERE user_email = $3`, [books, (user.user_wheels -= 1), user.user_email]);
				return await return_data(book_name);

			case "movies":
				let movie_name: string = await random_product("products_movies");
				let movies: Array<string> = [...user.user_movies];
				if (!movies.includes(movie_name)) {
					movies.push(movie_name);
				}
				await pool.query(`UPDATE Users SET (user_movies, user_wheels) = ($1, $2) WHERE user_email = $3`, [movies, (user.user_wheels -= 1), user.user_email]);
				return await return_data(movie_name);

			case "wheels":
				await pool.query(`UPDATE Users SET user_wheels = $1 WHERE user_email = $2`, [(user.user_wheels += 5), user.user_email]);
				return await return_data();

			case "money":
				user.user_money = Number(user.user_money);
				await pool.query(`UPDATE Users SET (user_money, user_wheels) = ($1, $2) WHERE user_email = $3`, [(user.user_money += 500), (user.user_wheels -= 1), user.user_email]);
				return await return_data();

			default:
				await pool.query(`UPDATE Users SET user_wheels = $1 WHERE user_email = $2`, [(user.user_wheels -= 1), user.user_email]);
				return await return_data();
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
