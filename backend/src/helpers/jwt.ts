import * as jwt from "jsonwebtoken";
import { Tokens, User } from "@types";

const JWT_tokens = ({ user_name, user_email, user_role, user_wheels, user_money, user_movies, user_books }): Tokens => {
	const user: User = {
		user_name,
		user_email,
		user_role,
		user_wheels,
		user_money,
		user_movies,
		user_books,
	};
	const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30m",
	});
	const refresh_token = jwt.sign(user, process.env.UPDATE_TOKEN_SECRET, {
		expiresIn: "36h",
	});
	return { access_token, refresh_token };
};
export { JWT_tokens };
