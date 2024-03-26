import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { APIS } from "@helpers/API";
import { ResGeneric, User } from "@types";

import { getData } from "@services/client/getData";
import { sendFeedback } from "@services/client/sendFeedback";
import { spinWheel } from "@services/client/spinWheel";
import { verifyPromocode } from "@services/client/verifyPromocode";

@Controller()
export class ClientController {
	@Get(APIS.client.wheel.spin.url)
	async SpinWheel(@Req() req: Request<any, any, { user: User }>, @Res() res: Response<{ msg?: string; error?: string; product_name?: string; prize?: string }>): Promise<void> {
		await spinWheel(req, res);
	}
	@Get(APIS.client.data.get.url)
	async GetData(@Req() req: Request<any, any, { user: User }>, @Res() res: Response<User | { error: string }>): Promise<void> {
		await getData(req, res);
	}
	@Post(APIS.client.promocode.verify.url)
	async VerifyPromocode(@Req() req: Request<any, any, { user: User; promocode: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await verifyPromocode(req, res);
	}

	@Post(APIS.client.feedback.send.url)
	async SendFeedback(@Req() req: Request<any, any, { user: User; msg: string; name: string }>, @Res() res: Response<ResGeneric>): Promise<void> {
		await sendFeedback(req, res);
	}
}
