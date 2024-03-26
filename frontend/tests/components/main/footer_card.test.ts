import FooterCard from "@ui/main/footerCard.vue";
import { mount } from "@vue/test-utils";
import { test, expect, describe, vi } from "vitest";
import message from "@media/svg/message.svg";
import telegram from "@media/svg/telegram.svg";
import { App, createApp } from "vue";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { uiStore } from "@types";
import { useUiStore } from "@state/pinia.ts";

let cards = [
	{
		icon_path: message,
		text: "Built-in feedback sender",
	},
	{
		link: { url: "https://t.me/Blatisgense", text: "Telegram" },
		icon_path: telegram,
		text: "Message into",
	},
];

describe("Footer Card - Component", (): void => {
	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();
	test("Social icon", (): void => {
		const wrapper = mount(FooterCard, {
			props: {
				icon_path: cards[1].icon_path,
				link_url: cards[1].link?.url,
				link_text: cards[1].link?.text,
				text: cards[1].text,
			},
		});
		expect(wrapper.get(".card__icon").html()).toContain("https://t.me/Blatisgense");
		expect(wrapper.get(".card__icon>img").html()).toContain("telegram.svg");
		expect(wrapper.get(".card__text").html()).toContain("Telegram");
	});
	test("Modal icon", () => {
		const wrapper = mount(FooterCard, {
			props: {
				icon_path: cards[0].icon_path,
				text: cards[0].text,
			},
		});
		expect(wrapper.get(".card__icon>img").html()).toContain("message.svg");
		expect(wrapper.get(".card__text").html()).toContain("Built-in feedback sender");
		wrapper.get(".card__text>a").trigger("click");
		vi.waitFor((): boolean => uiStore.feedback_open === true);
	});
});
