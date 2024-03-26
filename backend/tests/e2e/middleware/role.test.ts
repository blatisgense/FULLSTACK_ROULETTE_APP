import request from "superagent";
import { APIS } from "@helpers/API";
import { tokens, agent, expect, authorize_admin, authorize_user } from "@tests/tests.config";

describe("Middleware | Role", (): void => {
	beforeEach(async (): Promise<void> => {
		await authorize_admin();
		await authorize_user();
	});
	describe("Should gets success", (): void => {
		it("Login into ADMIN account", (done: Mocha.Done): void => {
			agent
				.get(`${APIS.admin.users.get.single.url}/lavr.marudenko@gmail.com`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.user_email).to.be.equal("lavr.marudenko@gmail.com");
					done();
				});
		});
	});
	describe("Should gets errors", (): void => {
		it("Login into USER account", (done: Mocha.Done): void => {
			agent
				.get(`${APIS.admin.users.get.single.url}/lavr.marudenko@gmail.com`)
				.set("cookie", tokens.user_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(403);
					expect(res.body.error).to.be.equal("Access denied.");
					done();
				});
		});
	});
});
