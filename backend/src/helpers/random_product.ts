import { pool } from "@database/db";
import { Products } from "@types";

export const random_product = async (product_type: "products_movies" | "products_books"): Promise<string> => {
	try {
		let products: Products = await (await pool.query(`SELECT * FROM Products;`)).rows[0];

		function product(arr: Array<string>): string {
			let random: number = Math.floor(Math.random() * arr.length);
			return arr[random];
		}

		return product(products[product_type]);
	} catch (error) {
		return error;
	}
};
