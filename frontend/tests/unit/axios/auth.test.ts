import { test, expect, vi, describe, afterAll } from "vitest";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { App, createApp } from "vue";
import { login, register, logout } from "@axios/auth.ts";
import { useUiStore } from "@state/pinia.ts";
import { uiStore, User } from "@types";
import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
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
	http.post(APIS.auth.login.url, () => {
		return HttpResponse.json({ msg: "You've logged in successfully." });
	}),
	http.get(APIS.client.data.get.url, () => {
		return HttpResponse.json(user);
	}),
	http.post(APIS.auth.register.url, () => {
		return HttpResponse.json({ msg: "Success!<br> You can Sign In with your data." });
	}),
	http.delete(APIS.auth.logout.url, () => {
		return HttpResponse.json({ msg: "You've logout successfully." });
	}),
];

const server: SetupServerApi = setupServer(...restHandlers);
server.listen({ onUnhandledRequest: "error" });

describe("Axios - Auth", (): void => {
	afterAll(() => server.close());

	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();

	test("Login", async (): Promise<void> => {
		await login({ email: "lavr.marudenko@gmail.com", password: "123456" });
		await vi.waitUntil((): boolean => uiStore.alert.text === "You've logged in successfully.", {
			timeout: 5000,
		});
		expect(uiStore.user).toStrictEqual(user);
	});
	test("Register", async (): Promise<void> => {
		await register({ email: "lavr.marudenko@gmail.com", password: "123456", name: "lavrik" });
		await vi.waitUntil((): boolean => uiStore.alert.text === "Success!<br> You can Sign In with your data.", {
			timeout: 5000,
		});
	});
	test("logout", async (): Promise<void> => {
		await logout();
		await vi.waitUntil((): boolean => uiStore.alert.text === "You've logout successfully.", {
			timeout: 5000,
		});
	});
});
