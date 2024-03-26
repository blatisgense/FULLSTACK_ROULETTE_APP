export type PrizeName = "money" | "wheels" | "books" | "movies" | "nothing";

export type Users = Array<User>;
export interface User {
	user_password?: string;
	user_name: string;
	user_email: string;
	user_role: "ADMIN" | "USER";
	user_money: number;
	user_wheels: number;
	user_movies: Array<string>;
	user_books: Array<string>;
}

export interface ResGeneric {
	msg?: string;
	error?: string;
}

export interface Products {
	products_books: Array<string>;
	products_movies: Array<string>;
}

export type Promocodes = Array<Promocode>;
export interface Promocode {
	promo: string;
	promo_value: string;
	promo_type: "wheels" | "money" | "books" | "movies";
}

export type Messages = Array<Message>;
export interface Message {
	sender_name: string;
	sender_email: string;
	msg: string;
	status: "unread" | "read";
	msg_id: number;
}

export interface Tokens {
	access_token: string;
	refresh_token: string;
}
