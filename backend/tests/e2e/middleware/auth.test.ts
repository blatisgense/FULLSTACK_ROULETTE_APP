import request from "superagent";
import { APIS } from "@helpers/API";
import { tokens, agent, expect, authorize_admin } from "@tests/tests.config";

describe("Middleware | Auth", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	describe("Should gets success", (): void => {
		it("Set only valid access token", (done: Mocha.Done): void => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.user_email).to.be.equal("lavr.marudenko@gmail.com");
					done();
				});
		});
		it("Set only valid refresh token", (done: Mocha.Done): void => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", tokens.admin_refresh_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.user_email).to.be.equal("lavr.marudenko@gmail.com");
					done();
				});
		});
		it("Set invalid access but valid refresh token", (done: Mocha.Done): void => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `access_token=invalid_token_`)
				.set("cookie", tokens.admin_refresh_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.user_email).to.be.equal("lavr.marudenko@gmail.com");

					done();
				});
		});
	});
	describe("Should gets errors", (): void => {
		it("Set no tokens", (done: Mocha.Done): void => {
			agent.get(APIS.client.data.get.url).end((_err, res: request.Response): void => {
				expect(res).to.have.status(403);
				expect(res.body.error).to.be.equal("You're tokens expired or replaced, please authorize again!");
				done();
			});
		});
		it("Set both invalid tokens", (done: Mocha.Done): void => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `refresh_token=invalid`)
				.set("cookie", `access_token=invalid`)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(403);
					expect(res.body.error).to.be.equal("You're tokens expired or replaced, please authorize again!");
					done();
				});
		});
	});
});
