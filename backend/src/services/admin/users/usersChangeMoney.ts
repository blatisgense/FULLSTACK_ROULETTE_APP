import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const users_change_money = async (req: Request<{ email: string; value: number }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if (isNaN(Number(req.params.value))) {
			return res.status(401).json({
				error: `Invalid data sent, value should be a Number.`,
			});
		}

		await pool.query(`UPDATE Users SET user_money = $1 WHERE user_email = $2`, [req.params.value, req.params.email]);

		return res.status(200).json({
			msg: `Money of ${req.params.email} changed to ${req.params.value}`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
