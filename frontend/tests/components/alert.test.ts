import Alert from "@ui/alert.vue";
import { mount } from "@vue/test-utils";
import { describe, test, expect, vi } from "vitest";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { useUiStore } from "@state/pinia.ts";
import { App, createApp } from "vue";
import { uiStore } from "@types";

describe("Alert - Component", (): void => {
	expect(Alert).toBeTruthy();
	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();
	test("Error message", (): void => {
		uiStore.set_alert("Error message", "error");
		const wrapper = mount(Alert);
		expect(wrapper.get(".alert__icon").html()).toContain("error.svg");
		expect(wrapper.get(".alert__text").html()).toContain("Error message");
	});
	test("Success message", (): void => {
		uiStore.set_alert("Success message", "success");
		const wrapper = mount(Alert);
		expect(wrapper.get(".alert__icon").html()).toContain("success.svg");
		expect(wrapper.get(".alert__text").html()).toContain("Success message");
	});
	test("Close modal", (): void => {
		uiStore.set_alert("Success message", "success");
		const wrapper = mount(Alert);
		wrapper.get(".alert").trigger("click");
		vi.waitFor((): boolean => uiStore.alert.show === false);
	});
});
