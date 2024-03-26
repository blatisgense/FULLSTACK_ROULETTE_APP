import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { afterAll, describe, test, expect, vi } from "vitest";
import { App, createApp } from "vue";
import { Products, uiStore } from "@types";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { useUiStore } from "@state/pinia.ts";
import { product_add, product_delete, products_get } from "@axios/admin/products.ts";
import { APIS } from "@helpers/API.ts";

let products: Products = {
	products_movies: ["bimbam"],
	products_books: ["bimbam"],
};

export const restHandlers: Array<HttpHandler> = [
	http.get(APIS.admin.products.get.url, () => {
		return HttpResponse.json(products);
	}),
	http.put(`${APIS.admin.products.add.url}/books/bimbam`, () => {
		return HttpResponse.json({ msg: "Book 'bimbam' added successfully" });
	}),
	http.delete(`${APIS.admin.products.delete.url}/books/bimbam`, () => {
		return HttpResponse.json({ msg: "Book 'bimbam' deleted successfully" });
	}),
];

const server: SetupServerApi = setupServer(...restHandlers);
server.listen({ onUnhandledRequest: "error" });

describe("Axios - Admin - Products", (): void => {
	afterAll(() => server.close());

	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();

	test("Get", async (): Promise<void> => {
		await products_get().then((res: Products): void => {
			expect(res).toStrictEqual(products);
		});
	});
	test("Add", async (): Promise<void> => {
		await product_add({ name: "bimbam", type: "books" });
		await vi.waitUntil((): boolean => uiStore.alert.text === `Book 'bimbam' added successfully`, {
			timeout: 5000,
		});
	});
	test("Delete", async (): Promise<void> => {
		await product_delete({ name: "bimbam", type: "books" });
		await vi.waitUntil((): boolean => uiStore.alert.text === `Book 'bimbam' deleted successfully`, {
			timeout: 5000,
		});
	});
});
