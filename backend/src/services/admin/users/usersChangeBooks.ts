import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const users_change_books = async (req: Request<{ method: "delete" | "add"; value: string; email: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if ((req.params.method != "add" && req.params.method != "delete") || !req.params.email || !req.params.value) {
			return res.status(401).json({
				error: `Invalid data sent.`,
			});
		}

		let method: string;
		let msg: string;

		switch (req.params.method) {
			case "delete":
				method = "ARRAY_REMOVE";
				msg = "deleted";
				break;
			case "add":
				method = "ARRAY_APPEND";
				msg = "added";
				break;
		}

		await pool.query(`UPDATE Users SET user_books = ${method}(user_books, $1) WHERE user_email = $2`, [req.params.value, req.params.email]);

		return res.status(200).json({
			msg: `Book ${req.params.value} ${msg} to ${req.params.email} successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
