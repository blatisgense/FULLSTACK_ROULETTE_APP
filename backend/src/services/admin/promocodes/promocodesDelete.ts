import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const promocode_delete = async (req: Request<{ promo: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		await pool.query(`DELETE FROM PromoCodes WHERE promo = $1`, [req.params.promo]);
		return res.status(200).json({
			msg: `Promocode ${req.params.promo} deleted successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
