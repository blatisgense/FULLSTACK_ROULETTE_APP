import { NextFunction, Request, Response } from "express";
import { User } from "@types";

export function role_middle(roles: Array<string>) {
	return (req: Request<any, any, { user: User }>, res: Response, next: NextFunction): Response => {
		try {
			let ROLE: string = req.body.user.user_role;

			let hasRole: string | undefined = roles.find((role: string): boolean => role === ROLE);

			if (hasRole === undefined) {
				return res.status(403).json({
					error: "Access denied.",
				});
			}
			next();
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	};
}
