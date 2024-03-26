import { pool } from "@database/db";
import { Request, Response } from "express";
import { Users } from "@types";

export const users_get_all = async (_req: Request, res: Response<Users | { error: string }>): Promise<Response<Users | { error: string }>> => {
	try {
		const users: Users = (await pool.query(`SELECT * FROM Users;`)).rows;
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
