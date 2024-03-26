import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

import { classUser } from "@models/ClassUser";
import { pool } from "@database/db";
import { ResGeneric, User } from "@types";

export const registration = async (req: Request<any, any, { name: string; email: string; password: string }>, res: Response<ResGeneric>, isAdd?: boolean): Promise<Response<ResGeneric>> => {
	try {
		if (!req.body.name || !req.body.email || !req.body.password) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const hashedPass: string = await bcrypt.hash(req.body.password, 6);

		const isAlreadyUse: User = await (await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.body.email])).rows[0];

		if (isAlreadyUse) {
			return res.status(401).json({
				error: "This Email already used.",
			});
		}

		let userTemplate: classUser = new classUser({
			name: req.body.name,
			email: req.body.email,
			password: hashedPass,
		});

		await pool.query(`INSERT INTO Users (user_name, user_email, user_password, user_role, user_wheels, user_money, user_movies, user_books) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
			userTemplate.user_name,
			userTemplate.user_email,
			userTemplate.user_password,
			userTemplate.user_role,
			userTemplate.user_wheels,
			userTemplate.user_money,
			userTemplate.user_movies,
			userTemplate.user_books,
		]);

		if (isAdd) {
			return res.status(200).json({
				msg: `User ${req.body.name} created.`,
			});
		}
		return res.status(200).json({
			msg: `Success!<br> You can Sign In with your data.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
