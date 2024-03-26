import WheelHint from "@ui/main/wheelHint.vue";
import { App, createApp } from "vue";
import { mount } from "@vue/test-utils";
import { test, expect, describe, vi } from "vitest";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { useUiStore } from "@state/pinia.ts";
import { uiStore } from "@types";

describe("Wheel Hint - Component", (): void => {
	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();

	test("Visible", (): void => {
		const wrapper = mount(WheelHint);
		expect(wrapper.html()).toContain("Click center to spin!");
		wrapper.get(".wheel__hint").trigger("click");
		vi.waitFor((): boolean => uiStore.hint === false);
	});
	test("Hidden", (): void => {
		uiStore.hint = false;
		const wrapper = mount(WheelHint);
		expect(wrapper.find(".wheel__hint").exists()).toBe(false);
	});
});
