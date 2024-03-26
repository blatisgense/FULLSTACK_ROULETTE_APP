import { test, vi, describe, afterAll, expect } from "vitest";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { App, createApp } from "vue";
import { feedback, spin, verify_promo, get_data } from "@axios/client.ts";
import { http, HttpHandler, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import { SpinPrize, uiStore, User } from "@types";
import { useUiStore } from "@state/pinia.ts";
import alert_success from "@media/svg/success.svg";
import { APIS } from "@helpers/API.ts";

let spin_res: { prize: SpinPrize; product_name: string } = {
	product_name: "Morning",
	prize: "movies",
};

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
	http.get(APIS.client.wheel.spin.url, () => {
		return HttpResponse.json(spin_res);
	}),
	http.get(APIS.client.data.get.url, () => {
		return HttpResponse.json(user);
	}),
	http.post(APIS.client.promocode.verify.url, () => {
		return HttpResponse.json({
			msg: "You've got: <br> money: 500",
		});
	}),
	http.post(APIS.client.feedback.send.url, () => {
		return HttpResponse.json({
			msg: "Massage sent successfully, you'll receive feedback by Email.",
		});
	}),
];

const server: SetupServerApi = setupServer(...restHandlers);
server.listen({ onUnhandledRequest: "error" });

describe("Axios - Client", (): void => {
	afterAll(() => server.close());

	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();
	uiStore.logged_in = true;
	uiStore.user.user_wheels = 1;

	describe("Should Return Success", (): void => {
		test("Get Data", async (): Promise<void> => {
			await get_data();
			expect(uiStore.user).toStrictEqual(user);
		});
		test("Spin", { timeout: 10000 }, async (): Promise<void> => {
			await spin();
			await vi.waitUntil((): boolean => uiStore.alert.icon === alert_success, {
				timeout: 10000,
			});
			expect(uiStore.prize_icon).toBe("/src/assets/media/images/movies.webp");
		});
		test("Promocode", async (): Promise<void> => {
			await verify_promo("aanifsdsd");
			expect(uiStore.alert.text).toBe("You've got: <br> money: 500");
		});
		test("Feedback", async (): Promise<void> => {
			await feedback({ name: "lavrik", msg: "sndsd sndiasn shd9ua sh" });
			await vi.waitUntil((): boolean => uiStore.alert.text === "Massage sent successfully, you'll receive feedback by Email.", {
				timeout: 5000,
			});
			expect(uiStore.feedback_open).toBe(false);
		});
	});
	describe("Should Return Error", (): void => {
		test("Spin No Wheels", async (): Promise<void> => {
			uiStore.user.user_wheels = 0;
			await spin();
			await vi.waitUntil((): boolean => uiStore.alert.text === `You haven't got any wheels!`, {
				timeout: 5000,
			});
		});
		test("Login Please", async (): Promise<void> => {
			uiStore.logged_in = false;
			await spin();
			await vi.waitUntil((): boolean => uiStore.alert.text === `You need to be authorized! Please Log In`, {
				timeout: 5000,
			});
			uiStore.alert.text = "";
			await feedback({ name: "lavrik", msg: "sndsd sndiasn shd9ua sh" });
			await vi.waitUntil((): boolean => uiStore.alert.text === `You need to be authorized! Please Log In`, {
				timeout: 5000,
			});
			uiStore.alert.text = "";
			await verify_promo("aanifsdsd");
			await vi.waitUntil((): boolean => uiStore.alert.text === `You need to be authorized! Please Log In`, {
				timeout: 5000,
			});
		});
	});
});
