import { pool } from "@database/db";
import { classPromocode } from "@models/classPromocode";
import { Request, Response } from "express";
import { Promocodes, ResGeneric } from "@types";

export const promocode_add = async (req: Request<any, any, { type: "money" | "wheels" | "movies" | "books"; promo: string; value: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if (!req.body.type || !req.body.promo || !req.body.value) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}

		if (!(req.body.type === "money" || req.body.type === "wheels" || req.body.type === "movies" || req.body.type === "books")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		if ((req.body.type === "money" || req.body.type === "wheels") && isNaN(Number(req.body.value))) {
			return res.status(401).json({
				error: `Invalid data sent, value must be a number`,
			});
		}

		const isAlreadyUse: Promocodes = await (await pool.query(`SELECT * FROM PromoCodes WHERE promo = $1`, [req.body.promo])).rows[0];

		if (isAlreadyUse) {
			return res.status(401).json({
				error: "This Promo already exist.",
			});
		}

		let promocode: classPromocode = new classPromocode({
			promo: req.body.promo,
			promo_type: req.body.type,
			promo_value: req.body.value,
		});

		await pool.query(`INSERT INTO PromoCodes (promo, promo_type, promo_value) VALUES ($1, $2, $3)`, [promocode.promo, promocode.promo_type, promocode.promo_value]);

		res.status(200).json({
			msg: `Promocode ${req.body.promo} created successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
