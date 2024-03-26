import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const feedback_read_one = async (req: Request<{ id: number }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		await pool.query(`UPDATE Feedback SET status = 'read' WHERE msg_id = $1;`, [req.params.id]);
		return res.status(200).json({ msg: `Message id${req.params.id} read.` });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
