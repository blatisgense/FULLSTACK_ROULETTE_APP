import { agent, authorize_admin, expect, tokens } from "@tests/tests.config";
import { APIS } from "@helpers/API";
import request from "superagent";

describe("Auth Controller", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	describe("Should gets success", (): void => {
		it("Login", (done: Mocha.Done): void => {
			agent
				.post(APIS.auth.login.url)
				.send({
					email: "lavr.marudenko@gmail.com",
					password: "123456",
				})
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.msg).to.be.equal("You've logged in successfully.");
					expect(res).to.have.cookie("access_token");
					expect(res).to.have.cookie("refresh_token");
					done();
				});
		});
		it("Logout", (done: Mocha.Done): void => {
			agent
				.delete(APIS.auth.logout.url)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.msg).to.be.equal("You've logout successfully.");
					expect(res).to.not.have.cookie("access_token");
					expect(res).to.not.have.cookie("refresh_token");
					done();
				});
		});
		it("Registration", async (): Promise<void> => {
			let res: request.Response = await agent.post(APIS.auth.register.url).set("cookie", tokens.admin_access_cookie).send({
				email: "testtest@gmail.com",
				password: "123456",
				name: "lavrik",
			});
			expect(res).to.have.status(200);
			expect(res.body.msg).to.be.equal("Success!<br> You can Sign In with your data.");

			let delete_after: request.Response = await agent.delete(`${APIS.admin.users.delete.url}/testtest@gmail.com`).set("cookie", tokens.admin_access_cookie);
			expect(delete_after).to.have.status(200);
			expect(delete_after.body.msg).to.be.equal("User testtest@gmail.com deleted successfully.");
		});
	});
	describe("Should gets errors", (): void => {
		describe("Login", (): void => {
			it("Invalid data sent", (done: Mocha.Done): void => {
				agent
					.post(APIS.auth.login.url)
					.send({})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("Invalid data sent, check request.body.");
						done();
					});
			});
			it("User not found", (done: Mocha.Done): void => {
				agent
					.post(APIS.auth.login.url)
					.send({
						email: "emailnotexist@gmail.com",
						password: "idbadisbad",
					})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("User not found, please try again.");
						done();
					});
			});
			it("Password is incorrect", (done: Mocha.Done): void => {
				agent
					.post(APIS.auth.login.url)
					.send({
						email: "lavr.marudenko@gmail.com",
						password: "inncorrectpassword",
					})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("Password is incorrect, please try again.");
						done();
					});
			});
		});
		describe("Registration", (): void => {
			it("Invalid data sent", (done: Mocha.Done): void => {
				agent
					.post(APIS.auth.register.url)
					.send({})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("Invalid data sent, check request.body.");
						done();
					});
			});
			it("Email already used", (done: Mocha.Done): void => {
				agent
					.post(APIS.auth.register.url)
					.send({
						email: "lavr.marudenko@gmail.com",
						password: "123456",
						name: "lavrik",
					})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("This Email already used.");
						done();
					});
			});
		});
	});
});
