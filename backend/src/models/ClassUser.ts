export class classUser {
	user_name: string;
	user_email: string;
	user_password: string;
	user_role: "USER" | "ADMIN";
	user_wheels: number;
	user_money: number;
	user_movies: Array<string>;
	user_books: Array<string>;
	constructor({ name, email, password }: { name: string; email: string; password: string }) {
		this.user_name = name;
		this.user_email = email;
		this.user_password = password;
		this.user_role = "USER";
		this.user_wheels = 0;
		this.user_money = 0;
		this.user_movies = [];
		this.user_books = [];
	}
}
