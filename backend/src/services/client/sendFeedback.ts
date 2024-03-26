import { Request, Response } from "express";
import { pool } from "@database/db";
import { ResGeneric, User } from "@types";

export const sendFeedback = async (req: Request<any, any, { user: User; msg: string; name: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if (!req.body.msg || !req.body.name) {
			return res.status(401).json({
				error: "Invalid data sent.",
			});
		}

		await pool.query(`INSERT INTO Feedback (msg, sender_name, sender_email, status) VALUES ($1, $2, $3, $4)`, [req.body.msg, req.body.name, req.body.user.user_email, "unread"]);

		return res.status(200).json({
			msg: "Massage sent successfully, you'll receive feedback by Email.",
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
