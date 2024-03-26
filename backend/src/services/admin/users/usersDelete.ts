import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const users_delete = async (req: Request<{ email: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		await pool.query(`DELETE FROM Users WHERE user_email = $1`, [req.params.email]);
		return res.status(200).json({
			msg: `User ${req.params.email} deleted successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
