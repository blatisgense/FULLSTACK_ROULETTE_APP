import { Promocodes } from "@types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useUiStore } from "@state/pinia.ts";
import { APIS } from "@helpers/API.ts";

export async function promocodes_get(): Promise<Promocodes> {
	return await axios
		.get(APIS.admin.promocode.get.url, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<Promocodes>): Promise<Promocodes> => {
			return res.data;
		})
		.catch(async (): Promise<Promocodes> => {
			useUiStore().set_alert("Unable to get Promocodes.", "error");
			return [];
		});
}

export async function promocode_add({ type, promo, value }: { type: "money" | "wheels" | "movies" | "books"; promo: string; value: string | number }): Promise<void> {
	await axios
		.put(
			APIS.admin.promocode.add.url,
			{
				type: type,
				promo: promo,
				value: value,
			},
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

export async function promocode_delete(promo: string): Promise<void> {
	await axios
		.delete(`${APIS.admin.promocode.delete.url}/${promo}`, {
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
