import { Controller, Post, Req, Res, Delete } from "@nestjs/common";
import { Request, Response } from "express";

import { APIS } from "@helpers/API";

import { login } from "@services/auth/login";
import { registration } from "@services/auth/registration";
import { logout } from "@services/auth/logout";
import { ResGeneric } from "@types";

@Controller()
export class AuthController {
	@Post(APIS.auth.login.url)
	async Login(@Req() req: Request, @Res() res: Response<ResGeneric>): Promise<void> {
		await login(req, res);
	}

	@Post(APIS.auth.register.url)
	async Registration(@Req() req: Request, @Res() res: Response<ResGeneric>): Promise<void> {
		await registration(req, res);
	}

	@Delete(APIS.auth.logout.url)
	async Logout(@Req() req: Request, @Res() res: Response<ResGeneric>): Promise<void> {
		logout(req, res);
	}
}
