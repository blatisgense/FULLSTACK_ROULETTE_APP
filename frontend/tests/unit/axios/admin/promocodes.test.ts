import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { afterAll, describe, expect, test, vi } from "vitest";
import { App, createApp } from "vue";
import { Promocodes, uiStore } from "@types";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { useUiStore } from "@state/pinia.ts";
import { promocode_add, promocode_delete, promocodes_get } from "@axios/admin/promocodes.ts";
import { APIS } from "@helpers/API.ts";

let promocodes: Promocodes = [
	{
		promo: "bimbam",
		promo_type: "wheels",
		promo_value: "10",
	},
	{
		promo: "bimbam",
		promo_type: "wheels",
		promo_value: "10",
	},
	{
		promo: "bimbam",
		promo_type: "wheels",
		promo_value: "10",
	},
];

export const restHandlers: Array<HttpHandler> = [
	http.get(APIS.admin.promocode.get.url, () => {
		return HttpResponse.json(promocodes);
	}),
	http.put(APIS.admin.promocode.add.url, () => {
		return HttpResponse.json({ msg: "Promocode 'bimbam' added successfully" });
	}),
	http.delete(`${APIS.admin.promocode.delete.url}/bimbam`, () => {
		return HttpResponse.json({ msg: "Promocode 'bimbam' deleted successfully" });
	}),
];

const server: SetupServerApi = setupServer(...restHandlers);
server.listen({ onUnhandledRequest: "error" });

describe("Axios - Admin - Promocodes", (): void => {
	afterAll(() => server.close());

	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();

	test("Get", async (): Promise<void> => {
		await promocodes_get().then((res: Promocodes): void => {
			expect(res).toStrictEqual(promocodes);
		});
	});
	test("Add", async (): Promise<void> => {
		await promocode_add({ type: "money", promo: "bimbam", value: 1000 });
		await vi.waitUntil((): boolean => uiStore.alert.text === `Promocode 'bimbam' added successfully`, {
			timeout: 5000,
		});
	});
	test("Delete", async (): Promise<void> => {
		await promocode_delete("bimbam");
		await vi.waitUntil((): boolean => uiStore.alert.text === `Promocode 'bimbam' deleted successfully`, {
			timeout: 5000,
		});
	});
});
