import axios, { AxiosError, AxiosResponse } from "axios";
import { useUiStore } from "@state/pinia.ts";
import { get_data } from "@axios/client.ts";
import { router } from "@router/router.ts";
import { APIS } from "@helpers/API.ts";

export async function login({ email, password }: { email: string; password: string }): Promise<void> {
	await axios
		.post(
			APIS.auth.login.url,
			{
				email: email,
				password: password,
			},
			{
				withCredentials: true,
			},
		)
		.then(async (res: AxiosResponse<{ msg: string }>): Promise<void> => {
			await get_data();
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

export async function logout(): Promise<void> {
	await axios
		.delete(APIS.auth.logout.url, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<{ msg: string }>): Promise<void> => {
			await useUiStore().erase_user_data();
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

export async function register({ email, password, name }: { email: string; password: string; name: string }): Promise<void> {
	await axios
		.post(
			APIS.auth.register.url,
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
			await router.push("/login");
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
