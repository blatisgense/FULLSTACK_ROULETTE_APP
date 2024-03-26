import { pool } from "@database/db";
import { Request, Response } from "express";
import { Messages } from "@types";

export const feedback_get_unread = async (_req: Request, res: Response<Messages | { error?: string }>): Promise<Response<Messages | { error?: string }>> => {
	try {
		const feedback: Messages = (await pool.query(`SELECT * FROM Feedback WHERE status = 'unread';`)).rows;
		return res.status(200).json(feedback);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
