import { Products } from "@types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useUiStore } from "@state/pinia.ts";
import { APIS } from "@helpers/API.ts";

export async function products_get(): Promise<Products> {
	return await axios
		.get(APIS.admin.products.get.url, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<Products>): Promise<Products> => {
			return res.data;
		})
		.catch(async (): Promise<Products> => {
			useUiStore().set_alert("Unable to get Promocodes.", "error");
			return { products_movies: [], products_books: [] };
		});
}

export async function product_add({ name, type }: { name: string; type: "books" | "movies" }): Promise<void> {
	await axios
		.put(
			`${APIS.admin.products.add.url}/${type}/${name}`,
			{},
			{
				withCredentials: true,
			},
		)
		.then(async (res: AxiosResponse<{ msg: string }>): Promise<void> => {
			useUiStore().set_alert(res.data.msg, "success");
		})
		.catch(async (err: AxiosError<{ error: string }>): Promise<void> => {
			if (err.response) {
				useUiStore().set_alert(err.response.data.error, "error");
			} else {
				console.log(err);
			}
		});
}

export async function product_delete({ name, type }: { name: string; type: "books" | "movies" }): Promise<void> {
	await axios
		.delete(`${APIS.admin.products.delete.url}/${type}/${name}`, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<{ msg: string }>): Promise<void> => {
			useUiStore().set_alert(res.data.msg, "success");
		})
		.catch(async (err: AxiosError<{ error: string }>): Promise<void> => {
			if (err.response) {
				useUiStore().set_alert(err.response.data.error, "error");
			} else {
				console.log(err);
			}
		});
}
