import axios, { AxiosError, AxiosResponse } from "axios";
import { useUiStore } from "@state/pinia.ts";
import { Users, User } from "@types";
import { APIS } from "@helpers/API.ts";

export async function user_change_integers({ email, value, field }: { email: string; value: string; field: "money" | "wheels" }): Promise<void> {
	await axios
		.patch(
			`${APIS.admin.users.change.integers.url}/${field}/${email}/${value}`,
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

export async function user_change_role({ email, value }: { email: string; value: "ADMIN" | "USER" }): Promise<void> {
	await axios
		.patch(
			`${APIS.admin.users.change.role.url}/${email}/${value}`,
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

export async function user_change_products({ email, name, field, method }: { email: string; name: string; field: "movies" | "books"; method: "add" | "delete" }): Promise<void> {
	await axios
		.patch(
			`${APIS.admin.users.change.products.url}/${field}/${email}/${method}/${name}`,
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

export async function user_get_all(): Promise<Users> {
	return await axios
		.get(APIS.admin.users.get.all.url, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<Users>): Promise<Users> => {
			return res.data;
		})
		.catch(async () => {
			useUiStore().set_alert("Unable to get Users' data.", "error");
			return [];
		});
}

export async function user_get_single(email: string): Promise<User | void> {
	return await axios
		.get(`${APIS.admin.users.get.single.url}/${email}`, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<User>): Promise<User> => {
			return res.data;
		})
		.catch(async (err: AxiosError<{ error: string }>): Promise<void> => {
			if (err.response) {
				useUiStore().set_alert(err.response.data.error, "error");
			} else {
				console.log(err);
			}
		});
}

export async function user_add({ email, name, password }: { email: string; name: string; password: string }): Promise<void> {
	await axios
		.put(
			APIS.admin.users.add.url,
			{
				email: email,
				name: name,
				password: password,
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

export async function user_delete(email: string): Promise<void> {
	await axios
		.delete(`${APIS.admin.users.delete.url}/${email}`, {
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
