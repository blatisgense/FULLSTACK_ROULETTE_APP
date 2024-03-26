import WheelCounter from "@ui/main/wheelCounter.vue";
import { App, createApp } from "vue";
import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { useUiStore } from "@state/pinia.ts";
import { uiStore } from "@types";

test("Wheel Counter - Component", (): void => {
	const app: App<Element> = createApp({});
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);
	const uiStore: uiStore = useUiStore();
	let one: number = Math.floor(Math.random() * 10);
	let ten: number = Math.floor(Math.random() * 10);
	uiStore.user.user_wheels = one + ten * 10;
	uiStore.set_counter();
	const wrapper = mount(WheelCounter);
	expect(wrapper.find(".counter__number:first-child").html()).toContain(ten);
	expect(wrapper.find(".counter__number:last-child").html()).toContain(one);
});
