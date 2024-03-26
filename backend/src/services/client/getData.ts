import { Response, Request } from "express";
import { User } from "@types";
export const getData = async (req: Request<any, any, { user: User }>, res: Response<User | { error: string }>): Promise<Response<User | { error: string }>> => {
	try {
		return res.status(200).json(req.body.user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
