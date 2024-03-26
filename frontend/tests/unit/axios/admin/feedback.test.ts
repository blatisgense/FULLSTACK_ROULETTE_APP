import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { afterAll, describe, test, expect } from "vitest";
import { App, createApp } from "vue";
import { Messages } from "@types";
import { get_messages, read_all_messages, read_message } from "@helpers/axios/admin/feedback.ts";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { APIS } from "@helpers/API.ts";

let msgs: Messages = [
	{
		status: "unread",
		msg: "bim bim bam bam",
		msg_id: 12,
		sender_email: "lavr.marudenko@gmail.com",
		sender_name: "lavrik",
	},
	{
		status: "unread",
		msg: "bim bim bam bam",
		msg_id: 13,
		sender_email: "lavr.marudenko@gmail.com",
		sender_name: "lavrik",
	},
	{
		status: "unread",
		msg: "bim bim bam bam",
		msg_id: 14,
		sender_email: "lavr.marudenko@gmail.com",
		sender_name: "lavrik",
	},
];

export const restHandlers: Array<HttpHandler> = [
	http.get(APIS.admin.feedback.get.unread.url, () => {
		return HttpResponse.json(msgs);
	}),
	http.patch(`${APIS.admin.feedback.read.single.url}/34`, () => {
		return HttpResponse.json(true);
	}),
	http.patch(APIS.admin.feedback.read.all.url, () => {
		return HttpResponse.json(true);
	}),
];

const server: SetupServerApi = setupServer(...restHandlers);
server.listen({ onUnhandledRequest: "error" });

describe("Axios - Admin - Feedback", (): void => {
	afterAll(() => server.close());

	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);

	test("Get Messages", async (): Promise<void> => {
		await get_messages().then((msgs: Messages): void => {
			expect(msgs).toStrictEqual(msgs);
		});
	});
	test("Read Single", async (): Promise<void> => {
		await read_message(34).then((res: boolean | void): void => {
			expect(res).toBe(true);
		});
	});
	test("Read All", async (): Promise<void> => {
		await read_all_messages().then((res: boolean | void): void => {
			expect(res).toBe(true);
		});
	});
});
