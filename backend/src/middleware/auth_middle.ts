import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { pool } from "@database/db";
import { JWT_tokens } from "@helpers/jwt";
import { Tokens, User } from "@types";

export function auth_middle(req: Request<any, any, { user: User }>, res: Response, next: NextFunction): Response {
	try {
		async function fetch_user_data(email: string): Promise<User> {
			return await (
				await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [email])
			).rows[0];
		}
		function verify_access(): void {
			jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET, async (error: any, user: User): Promise<void> => {
				if (error) {
					return verify_refresh();
				}
				req.body.user = await fetch_user_data(user.user_email);
				next();
			});
		}
		function verify_refresh(): void {
			jwt.verify(req.cookies.refresh_token, process.env.UPDATE_TOKEN_SECRET, async (error: any, user: User): Promise<Response> => {
				if (error) {
					return res.status(403).json({
						error: "You're tokens expired or replaced, please authorize again!",
					});
				}
				user = await fetch_user_data(user.user_email);
				let jwtTokens: Tokens = JWT_tokens(user);
				res.cookie("refresh_token", jwtTokens.refresh_token, {
					httpOnly: true,
					sameSite: "none",
					secure: true,
				});
				res.cookie("access_token", jwtTokens.access_token, {
					httpOnly: true,
					sameSite: "none",
					secure: true,
				});

				req.body.user = user;
				next();
			});
		}

		verify_access();
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}
