import { Request, Response } from "express";
import { ResGeneric } from "@types";
export const logout = (_req: Request, res: Response<ResGeneric>): Response<ResGeneric> => {
	try {
		res.clearCookie("refresh_token", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.clearCookie("access_token", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		return res.status(200).json({ msg: "You've logout successfully." });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
