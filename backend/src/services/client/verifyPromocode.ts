import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "@database/db";
import { Promocode, ResGeneric, User } from "@types";

export const verifyPromocode = async (req: Request<any, any, { user: User; promocode: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if (!req.body.promocode) {
			return res.status(401).json({
				error: "Invalid data sent.",
			});
		}

		const user: User = req.body.user;

		let promocode: Promocode = await (await pool.query(`SELECT * FROM PromoCodes WHERE promo = $1`, [req.body.promocode])).rows[0];

		if (!promocode) {
			return res.status(401).json({
				error: "Promocode not found.",
			});
		}

		const delete_promo = async (): Promise<QueryResult> => await pool.query(`DELETE FROM PromoCodes WHERE promo = $1`, [promocode.promo]);

		switch (promocode.promo_type) {
			case "movies":
				let movies: Array<string> = [...user.user_movies];
				if (!movies.includes(promocode.promo_value)) {
					movies.push(promocode.promo_value);
				}
				await pool.query(`UPDATE Users SET user_movies = $1 WHERE user_email = $2`, [movies, user.user_email]);
				await delete_promo();
				return res.status(200).json({ msg: `You've got:<br>Movie '${promocode.promo_value}'` });

			case "books":
				let books: Array<string> = [...user.user_books];
				if (!books.includes(promocode.promo_value)) {
					books.push(promocode.promo_value);
				}
				await pool.query(`UPDATE Users SET user_books = $1 WHERE user_email = $2`, [books, user.user_email]);
				await delete_promo();
				return res.status(200).json({ msg: `You've got:<br>Book '${promocode.promo_value}'` });

			case "wheels":
				user.user_wheels = Number(user.user_wheels) + Number(promocode.promo_value);
				await pool.query(`UPDATE Users SET user_wheels = $1 WHERE user_email = $2`, [user.user_wheels, user.user_email]);
				await delete_promo();
				return res.status(200).json({ msg: `You've got:<br>Wheels ${promocode.promo_value}` });

			case "money":
				user.user_money = Number(user.user_money) + Number(promocode.promo_value);
				await pool.query(`UPDATE Users SET user_money = $1 WHERE user_email = $2`, [user.user_money, user.user_email]);
				await delete_promo();
				return res.status(200).json({ msg: `You've got:<br>Money ${promocode.promo_value}` });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
