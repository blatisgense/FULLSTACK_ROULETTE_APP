import { pool } from "@database/db";
import { Request, Response } from "express";
import { Products, ResGeneric } from "@types";

export const products_add_movies = async (req: Request<{ name: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		const isAlreadyUse: Products = await (await pool.query(`SELECT * FROM Products WHERE $1 = ANY(products_movies);`, [req.params.name])).rows[0];

		if (isAlreadyUse) {
			return res.status(401).json({
				error: "This movie already exist.",
			});
		}

		await pool.query(`UPDATE Products SET products_movies = ARRAY_APPEND(products_movies, $1)`, [req.params.name]);

		return res.status(200).json({
			msg: `Movie ${req.params.name} added successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
