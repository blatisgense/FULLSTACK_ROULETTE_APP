import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BreadCrumbs from "@ui/admin/breadCrumbs.vue";

test("BreadCrumbs", (): void => {
	expect(BreadCrumbs).toBeTruthy();
	const wrapper = mount(BreadCrumbs, {
		props: {
			matched: [
				{
					meta: { name: "Admin" },
				},
				{
					meta: { name: "Users" },
				},
				{
					meta: { name: "Get" },
				},
				{
					meta: { name: "Single" },
				},
			],
		},
	});
	expect(wrapper.findAll("span.bread__item").length === 4);
});
