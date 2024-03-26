import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

import { JWT_tokens } from "@/helpers/jwt";
import { pool } from "@database/db";
import { Tokens, User, ResGeneric } from "@types";

export const login = async (req: Request<any, any, { email: string; password: string }>, res: Response<ResGeneric>): Promise<Response<ResGeneric>> => {
	try {
		if (!req.body.email || !req.body.password) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const user: User = await (await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.body.email])).rows[0];

		if (!user) {
			return res.status(401).json({
				error: "User not found, please try again.",
			});
		}

		const validPass: boolean = await bcrypt.compare(req.body.password, user.user_password);

		if (!validPass) {
			return res.status(401).json({
				error: "Password is incorrect, please try again.",
			});
		}

		let TOKENS: Tokens = JWT_tokens(user);

		res.cookie("refresh_token", TOKENS.refresh_token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.cookie("access_token", TOKENS.access_token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		return res.status(200).json({ msg: "You've logged in successfully." });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
