import { Store, StoreDefinition } from "pinia";

export type Users = Array<User>;

/**
 * User object, stores all user info
 * */
export interface User {
	user_email: string | null;
	user_name: string | null;
	user_role: "USER" | "ADMIN" | null;
	user_wheels: number | null;
	user_money: number | null;
	user_movies: Array<string> | null;
	user_books: Array<string> | null;
	user_password: string | null;
}

export type Promocodes = Array<Promocode>;

/**
 * Promocode object, stores info about promocode
 * */
export interface Promocode {
	promo: string;
	promo_type: "wheels" | "money" | "books" | "movies";
	promo_value: string;
}

/**
 * Products' object, stores arrays for products
 * */
export interface Products {
	products_movies: Array<string>;
	products_books: Array<string>;
}

export type Messages = Array<Message>;

/**
 * Message object, stores feedback from a client
 * */
export interface Message {
	sender_name: string;
	sender_email: string;
	msg: string;
	status: "unread" | "read";
	msg_id: number;
}
/**
 * prize received by spinning wheel
 * */
export type SpinPrize = "wheels" | "default" | "books" | "movies" | "money" | "nothing";

/**
 * types for pinia ui state
 * */
export interface uiStoreState {
	user: User;
	logged_in: boolean;
	counter: { ten: number; one: number };
	hint: boolean;
	feedback_open: boolean;
	prize_icon: string;
	prizes: Record<string, string>;
	show_hint: boolean;
	spin: boolean;
	cabinet_open: boolean;
	modal_bg: boolean;
	alert: {
		text: string;
		icon: string;
		show: boolean;
	};
	alert_icons: {
		error: string;
		success: string;
	};
	new_messages: boolean;
	message_open: boolean;
	admin_sidebar_show: boolean;
}

/**
 * types for pinia ui actions
 * */
export interface uiStoreActions {
	reset_counter(): void;
	set_counter(): void;
	set_prize_icon(prize_name: SpinPrize): string;
	set_alert(text: string, type: "error" | "success"): void;
	toggle_modal_bg(bool: boolean): void;
	toggle_modal_cabinet(bool: boolean): void;
	toggle_modal_feedback(bool: boolean): void;
	set_user_data(userData: User, isAdmin?: boolean): Promise<void>;
	erase_user_data(): Promise<void>;
}

export type uiStore = Store<"ui", uiStoreState, any, uiStoreActions>;
export type uiStoreDefinition = StoreDefinition<"ui", uiStoreState, any, uiStoreActions>;
