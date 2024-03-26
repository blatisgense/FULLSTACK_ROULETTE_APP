import { pool } from "@database/db";
import { Request, Response } from "express";
import { User } from "@types";

export const users_get_single = async (req: Request<{ email: string }>, res: Response<User | { error: string }>): Promise<Response<User | { error: string }>> => {
	try {
		const user: User = await (await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.params.email])).rows[0];
		if (!user) {
			return res.status(401).json({
				error: `User not found, check entered email.`,
			});
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
