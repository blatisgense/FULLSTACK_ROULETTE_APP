import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { afterAll, describe, vi, expect } from "vitest";
import { user_change_integers, user_change_role, user_change_products, user_get_all, user_get_single, user_add, user_delete } from "@helpers/axios/admin/users.ts";
import { App, createApp } from "vue";
import { uiStore, User, Users } from "@types";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { useUiStore } from "@state/pinia.ts";
import { APIS } from "@helpers/API.ts";

let user: User = {
	user_email: "lavr.marudenko@gmail.com",
	user_name: "lavrik",
	user_role: "ADMIN",
	user_wheels: 10,
	user_money: 500,
	user_movies: ["bim"],
	user_books: ["bam"],
	user_password: "123456",
};

export const restHandlers: Array<HttpHandler> = [
	http.patch(`${APIS.admin.users.change.integers.url}/money/lavr.marudenko@gmail.com/500`, () => {
		return HttpResponse.json({ msg: "lavr.marudenko@gmail.com money changed to 500" });
	}),
	http.patch(`${APIS.admin.users.change.role.url}/lavr.marudenko@gmail.com/ADMIN`, () => {
		return HttpResponse.json({ msg: "lavr.marudenko@gmail.com role changed to ADMIN" });
	}),
	http.patch(`${APIS.admin.users.change.products.url}/books/lavr.marudenko@gmail.com/add/bimbam`, () => {
		return HttpResponse.json({ msg: "Successfully added book 'bimbam' to lavr.marudenko@gmail.com" });
	}),
	http.get(APIS.admin.users.get.all.url, () => {
		return HttpResponse.json([user, user, user]);
	}),
	http.get(`${APIS.admin.users.get.single.url}/lavr.marudenko@gmail.com`, () => {
		return HttpResponse.json(user);
	}),
	http.put(APIS.admin.users.add.url, () => {
		return HttpResponse.json({ msg: `user lavr.marudenko@gmail.com added successfully` });
	}),
	http.delete(`${APIS.admin.users.delete.url}/lavr.marudenko@gmail.com`, () => {
		return HttpResponse.json({ msg: `user lavr.marudenko@gmail.com deleted successfully` });
	}),
];

const server: SetupServerApi = setupServer(...restHandlers);
server.listen({ onUnhandledRequest: "error" });

describe("Axios - Admin - Users", (): void => {
	afterAll(() => server.close());

	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();

	test("Change Integers", async () => {
		await user_change_integers({ email: "lavr.marudenko@gmail.com", field: "money", value: "500" });
		await vi.waitUntil((): boolean => uiStore.alert.text === `lavr.marudenko@gmail.com money changed to 500`, {
			timeout: 5000,
		});
	});
	test("Change Role", async () => {
		await user_change_role({ email: "lavr.marudenko@gmail.com", value: "ADMIN" });
		await vi.waitUntil((): boolean => uiStore.alert.text === `lavr.marudenko@gmail.com role changed to ADMIN`, {
			timeout: 5000,
		});
	});
	test("Change Products", async () => {
		await user_change_products({ email: "lavr.marudenko@gmail.com", field: "books", method: "add", name: "bimbam" });
		await vi.waitUntil((): boolean => uiStore.alert.text === `Successfully added book 'bimbam' to lavr.marudenko@gmail.com`, {
			timeout: 5000,
		});
	});
	test("Get All", async () => {
		await user_get_all().then((res: Users) => {
			expect(res).toStrictEqual([user, user, user]);
		});
	});
	test("Get Single", async () => {
		await user_get_single("lavr.marudenko@gmail.com").then((res: User | void) => {
			expect(res).toStrictEqual(user);
		});
	});
	test("Add", async () => {
		await user_add({ email: "lavr.marudenko@gmail.com", name: "lavrik", password: "123456" });
		await vi.waitUntil((): boolean => uiStore.alert.text === `user lavr.marudenko@gmail.com added successfully`, {
			timeout: 5000,
		});
	});
	test("Delete", async () => {
		await user_delete("lavr.marudenko@gmail.com");
		await vi.waitUntil((): boolean => uiStore.alert.text === `user lavr.marudenko@gmail.com deleted successfully`, {
			timeout: 5000,
		});
	});
});
