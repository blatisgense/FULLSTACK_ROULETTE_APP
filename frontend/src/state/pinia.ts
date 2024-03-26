import { defineStore } from "pinia";
import { SpinPrize, uiStoreDefinition, uiStoreState, User } from "@types";
import default_prize from "@media/images/default_prize.webp";
import money_prize from "@media/images/500.webp";
import no_prize from "@media/images/face.webp";
import wheels_prize from "@media/images/trie.webp";
import movies_prize from "@media/images/movies.webp";
import books_prize from "@media/images/books.webp";
import alert_error from "@media/svg/error.svg";
import alert_success from "@media/svg/success.svg";
import { router } from "@router/router.ts";

export const useUiStore: uiStoreDefinition = defineStore("ui", {
	state: (): uiStoreState => ({
		user: {
			user_email: null,
			user_name: null,
			user_role: null,
			user_wheels: null,
			user_money: null,
			user_movies: [],
			user_books: [],
			user_password: null,
		},
		logged_in: false,
		counter: {
			ten: 0,
			one: 0,
		},
		hint: true,
		feedback_open: false,
		prize_icon: default_prize,
		prizes: {
			default: default_prize,
			books: books_prize,
			movies: movies_prize,
			money: money_prize,
			wheels: wheels_prize,
			nothing: no_prize,
		},
		alert_icons: {
			error: alert_error,
			success: alert_success,
		},
		show_hint: true,
		spin: false,
		cabinet_open: false,
		modal_bg: false,
		alert: {
			icon: alert_error,
			show: false,
			text: "",
		},
		new_messages: false,
		message_open: false,
		admin_sidebar_show: true,
	}),
	actions: {
		reset_counter(): void {
			this.counter.one = 0;
			this.counter.ten = 0;
		},
		set_counter(): void {
			if (this.user.user_wheels) {
				this.counter.one = this.user.user_wheels % 10;
				this.counter.ten = Math.floor(this.user.user_wheels / 10);
			}
		},
		set_prize_icon(prize_name: SpinPrize): string {
			return (this.prize_icon = this.prizes[prize_name]);
		},
		set_alert(text: string, type: "error" | "success"): void {
			this.alert.text = text;
			this.alert.icon = this.alert_icons[type];
			this.alert.show = true;
		},
		toggle_modal_bg(bool: boolean): void {
			this.modal_bg = bool;
			document.body.setAttribute("data-modal", String(bool));
		},
		toggle_modal_cabinet(bool: boolean): void {
			this.cabinet_open = bool;
			this.toggle_modal_bg(bool);
		},
		toggle_modal_feedback(bool: boolean): void {
			this.feedback_open = bool;
			this.toggle_modal_bg(bool);
		},
		async set_user_data(userData: User, isAdmin?: boolean): Promise<void> {
			this.logged_in = true;
			if (!isAdmin) await router.push("/");
			this.user = userData;
			this.set_counter();
		},
		async erase_user_data(): Promise<void> {
			this.logged_in = false;
			await router.push("/login");
			this.user = {
				user_email: null,
				user_name: null,
				user_role: null,
				user_wheels: null,
				user_money: null,
				user_movies: [],
				user_books: [],
				user_password: null,
			};
			this.reset_counter();
		},
	},
});
