import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const users_change_role = async (req: Request<{ value: "ADMIN" | "USER"; email: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if ((req.params.value.toUpperCase() != "USER" && req.params.value.toUpperCase() != "ADMIN") || !req.params.email) {
			return res.status(401).json({
				error: `Invalid data sent.`,
			});
		}

		await pool.query(`UPDATE Users SET user_role = $1 WHERE user_email = $2`, [req.params.value.toUpperCase(), req.params.email]);

		return res.status(200).json({
			msg: `Role of ${req.params.email} changed to ${req.params.value.toUpperCase()}`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
