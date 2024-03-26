import { mount } from "@vue/test-utils";
import { describe, test, expect, vi } from "vitest";
import AdminMessages from "@sections/admin/adminMessages.vue";
import { App, createApp } from "vue";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { Messages } from "@types";

let msgs: Messages = [
	{
		status: "unread",
		msg: "bim bim bam bam",
		msg_id: 12,
		sender_email: "lavr.marudenko@gmail.com",
		sender_name: "lavrik",
	},
	{
		status: "unread",
		msg: "bim bim bam bam",
		msg_id: 13,
		sender_email: "lavr.marudenko@gmail.com",
		sender_name: "lavrik",
	},
	{
		status: "unread",
		msg: "bim bim bam bam",
		msg_id: 14,
		sender_email: "lavr.marudenko@gmail.com",
		sender_name: "lavrik",
	},
];

function get(): Messages {
	return msgs;
}

function single(_id: number): boolean {
	return true;
}

function all(): boolean {
	return true;
}

describe("Admin - Messages Component", (): void => {
	const app: App<Element> = createApp({});
	expect(AdminMessages).toBeTruthy();
	const pinia: Pinia = createPinia();
	setActivePinia(pinia);
	app.use(pinia);

	vi.mock("@axios/admin/feedback.ts", () => {
		return {
			get_messages: vi.fn(async (): Promise<Messages> => {
				return get();
			}),
			read_message: vi.fn(async (id: number): Promise<boolean> => {
				return single(id);
			}),
			read_all_messages: vi.fn(async (): Promise<boolean> => {
				return all();
			}),
		};
	});
	test("Get Unread And Render", async (): Promise<void> => {
		const wrapper = mount(AdminMessages);
		await vi.waitUntil(() => wrapper.find(".messages__card_msg").exists(), {
			timeout: 5000,
		});
		expect(wrapper.findAll(".messages__card_msg").length).toBe(3);
		expect(wrapper.get(".messages__card_msg").html()).toContain("bim bim bam bam");
	});
	test("Read Single Message", async (): Promise<void> => {
		const wrapper = mount(AdminMessages);
		await vi.waitUntil(() => wrapper.find(".messages__card_msg").exists(), {
			timeout: 5000,
		});
		expect(wrapper.findAll(".messages__card_msg").length).toBe(3);
		await wrapper.get(".messages__card").trigger("click");
		await vi.waitUntil(() => wrapper.findAll(".messages__card").length === 2, {
			timeout: 5000,
		});
		expect(wrapper.findAll(".messages__card_msg").length).toBe(2);
	});
	test("Read All Messages", async (): Promise<void> => {
		const wrapper = mount(AdminMessages);
		await vi.waitUntil(() => wrapper.find(".messages__card_msg").exists(), {
			timeout: 5000,
		});
		expect(wrapper.findAll(".messages__card_msg").length).toBe(2);
		await wrapper.get(".messages__read").trigger("click");
		await vi.waitUntil(() => wrapper.find(".messages__fallback").exists(), {
			timeout: 5000,
		});
		expect(wrapper.get(".messages__fallback").html()).toContain("No unread messages yet.");
	});
});
