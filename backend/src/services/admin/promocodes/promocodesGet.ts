import { pool } from "@database/db";
import { Request, Response } from "express";
import { Promocodes } from "@types";

export const promocodes_get = async (_req: Request, res: Response<Promocodes | { error?: string }>): Promise<Response> => {
	try {
		const promocode: Promocodes = (await pool.query(`SELECT * FROM PromoCodes;`)).rows;

		return res.status(200).json(promocode);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
