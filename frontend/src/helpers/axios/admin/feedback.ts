import axios, { AxiosResponse } from "axios";
import { Messages } from "@types";
import { useUiStore } from "@state/pinia.ts";
import { APIS } from "@helpers/API.ts";

export async function get_messages(): Promise<Messages> {
	return await axios
		.get(APIS.admin.feedback.get.unread.url, {
			withCredentials: true,
		})
		.then((res: AxiosResponse<Messages>): Messages => {
			return res.data;
		})
		.catch((): Messages => {
			useUiStore().set_alert("Unable get messages.", "error");
			return [];
		});
}

export async function read_message(id: number): Promise<boolean | void> {
	return await axios
		.patch(
			`${APIS.admin.feedback.read.single.url}/${id}`,
			{},
			{
				withCredentials: true,
			},
		)
		.then((): boolean => {
			return true;
		})
		.catch((): void => {
			useUiStore().set_alert(`Unable to read message ${id}.`, "error");
		});
}

export async function read_all_messages(): Promise<boolean | void> {
	return await axios
		.patch(
			APIS.admin.feedback.read.all.url,
			{},
			{
				withCredentials: true,
			},
		)
		.then((): boolean => {
			return true;
		})
		.catch((): void => {
			useUiStore().set_alert(`Unable to read messages.`, "error");
		});
}
