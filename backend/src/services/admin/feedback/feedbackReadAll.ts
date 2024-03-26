import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const feedback_read_all = async (_req: Request, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		await pool.query(`UPDATE Feedback SET status = 'read' WHERE status = 'unread';`);
		return res.status(200).json({ msg: "All messages read." });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
