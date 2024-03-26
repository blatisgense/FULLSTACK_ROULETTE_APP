import { pool } from "@database/db";
import { Request, Response } from "express";
import { ResGeneric } from "@types";

export const products_delete_books = async (req: Request<{ name: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		await pool.query(`UPDATE Products SET products_books = ARRAY_REMOVE(products_books, $1)`, [req.params.name]);
		return res.status(200).json({
			msg: `Book ${req.params.name} deleted successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
