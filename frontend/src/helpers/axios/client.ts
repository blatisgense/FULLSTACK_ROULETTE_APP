import axios, { AxiosError, AxiosResponse } from "axios";
import { useUiStore } from "@state/pinia.ts";
import { SpinPrize, User } from "@types";
import { APIS } from "@helpers/API.ts";

export async function get_data(first?: boolean, isAdmin?: boolean): Promise<void> {
	await axios
		.get(APIS.client.data.get.url, {
			withCredentials: true,
		})
		.then(async (res: AxiosResponse<User>): Promise<void> => {
			await useUiStore().set_user_data(res.data, isAdmin);
			if (first) useUiStore().set_alert("Session token found, await data loading!", "success");
		})
		.catch(async () => {
			if (!first) {
				await useUiStore().erase_user_data();
				useUiStore().set_alert("Session token not found, Log In again!", "error");
			}
		});
}

export async function verify_promo(promo: string): Promise<void> {
	if (!useUiStore().logged_in) {
		useUiStore().set_alert("You need to be authorized! Please Log In", "error");
		return;
	}
	await axios
		.post(
			APIS.client.promocode.verify.url,
			{
				promocode: promo,
			},
			{
				withCredentials: true,
			},
		)
		.then(async (res: AxiosResponse<{ msg: string }>): Promise<void> => {
			useUiStore().set_alert(res.data.msg, "success");
			await get_data();
		})
		.catch(async (err: AxiosError<{ error: string }>): Promise<void> => {
			if (err.response) {
				useUiStore().set_alert(err.response.data.error, "error");
			} else {
				console.log(err);
			}
		});
}

export async function spin(): Promise<void> {
	if (useUiStore().logged_in === false) {
		useUiStore().set_alert("You need to be authorized! Please Log In", "error");
		return;
	}
	if (useUiStore().user.user_wheels === 0) {
		useUiStore().set_alert("You haven't got any wheels!", "error");
		return;
	}
	if (useUiStore().spin === true) return;

	await axios
		.get(APIS.client.wheel.spin.url, {
			withCredentials: true,
		})
		.then(
			async (
				res: AxiosResponse<{
					prize: SpinPrize;
					product_name: string | null;
				}>,
			): Promise<void> => {
				useUiStore().set_prize_icon("default");
				useUiStore().spin = true;
				setTimeout((): void => {
					useUiStore().spin = false;
					useUiStore().set_prize_icon(res.data.prize);
					switch (res.data.prize) {
						case "movies":
							useUiStore().set_alert(`You've got: <br> Movie - ${res.data.product_name}!`, "success");
							break;
						case "books":
							useUiStore().set_alert(`You've got: <br> Book - ${res.data.product_name}!`, "success");
							break;
						case "nothing":
							useUiStore().set_alert(`Oops, you've got nothing. <br> Better luck next time!`, "success");
							break;
						case "wheels":
							useUiStore().set_alert(`You've got: <br> 5 free wheels!`, "success");
							break;
						case "money":
							useUiStore().set_alert(`You've got: <br> 500 money!`, "success");
							break;
					}
				}, 7000);
				await get_data();
			},
		)
		.catch(async (err: AxiosError<{ error: string }>): Promise<void> => {
			if (err.response) {
				useUiStore().set_alert(err.response.data.error, "error");
			} else {
				console.log(err);
			}
		});
}

export async function feedback({ name, msg }: { name: string; msg: string }): Promise<void> {
	if (!useUiStore().logged_in) {
		useUiStore().set_alert("You need to be authorized! Please Log In", "error");
		return;
	}

	await axios
		.post(
			APIS.client.feedback.send.url,
			{
				msg: msg,
				name: name,
			},
			{
				withCredentials: true,
			},
		)
		.then(async (res: AxiosResponse<{ msg: string }>): Promise<void> => {
			useUiStore().set_alert(res.data.msg, "success");
			useUiStore().toggle_modal_feedback(false);
		})
		.catch(async (err: AxiosError<{ error: string }>): Promise<void> => {
			if (err.response) {
				useUiStore().set_alert(err.response.data.error, "error");
			} else {
				console.log(err);
			}
		});
}
