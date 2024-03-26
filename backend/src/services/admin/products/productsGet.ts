import { pool } from "@database/db";
import { Request, Response } from "express";
import { Products } from "@types";

export const products_get_all = async (_req: Request, res: Response<Products | { error?: string }>): Promise<Response<Products | { error?: string }>> => {
	try {
		const products: Products = await (await pool.query(`SELECT * FROM Products;`)).rows[0];
		return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
