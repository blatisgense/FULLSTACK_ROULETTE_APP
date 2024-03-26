import { agent, authorize_admin, expect, tokens } from "@tests/tests.config";
import { APIS } from "@helpers/API";
import request from "superagent";
import { it } from "mocha";

describe("Admin Controller | Users", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	it("Users testing cycle", async (): Promise<void> => {
		let add: request.Response = await agent.put(APIS.admin.users.add.url).set("cookie", tokens.admin_access_cookie).send({
			name: "user",
			email: "testuser@example.com",
			password: "password",
		});
		expect(add).to.have.status(200);
		expect(add.body.msg).to.be.equal("User user created.");

		await agent.patch(`${APIS.admin.users.change.money.url}/testuser@example.com/1000`).set("cookie", tokens.admin_access_cookie);
		await agent.patch(`${APIS.admin.users.change.wheels.url}/testuser@example.com/30`).set("cookie", tokens.admin_access_cookie);
		await agent.patch(`${APIS.admin.users.change.role.url}/testuser@example.com/ADMIN`).set("cookie", tokens.admin_access_cookie);
		await agent.patch(`${APIS.admin.users.change.books.url}/testuser@example.com/add/book`).set("cookie", tokens.admin_access_cookie);
		await agent.patch(`${APIS.admin.users.change.movies.url}/testuser@example.com/add/movie`).set("cookie", tokens.admin_access_cookie);

		let data: request.Response = await agent.get(`${APIS.admin.users.get.single.url}/testuser@example.com`).set("cookie", tokens.admin_access_cookie);
		expect(data).to.have.status(200);
		expect(data.body.user_name).to.be.equal("user");
		expect(data.body.user_email).to.be.equal("testuser@example.com");
		expect(data.body.user_role).to.be.equal("ADMIN");
		expect(data.body.user_wheels).to.be.equal("30");
		expect(data.body.user_money).to.be.equal("1000");
		expect(data.body.user_books).to.deep.equal(["book"]);
		expect(data.body.user_movies).to.deep.equal(["movie"]);

		let del: request.Response = await agent.delete(`${APIS.admin.users.delete.url}/testuser@example.com`).set("cookie", tokens.admin_access_cookie);
		expect(del).to.have.status(200);
		expect(del.body.msg).to.be.equal("User testuser@example.com deleted successfully.");
	});
	it("Get all Users", (done: Mocha.Done): void => {
		agent
			.get(APIS.admin.users.get.all.url)
			.set("cookie", tokens.admin_access_cookie)
			.end((_err, res: request.Response): void => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				done();
			});
	});
	describe("Users errors", (): void => {
		it("User not found", (done: Mocha.Done): void => {
			agent
				.get(`${APIS.admin.users.get.single.url}/usernotfound@mail.com`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("User not found, check entered email.");
					done();
				});
		});
		it("Change Role | Invalid data sent.", (done: Mocha.Done): void => {
			agent
				.patch(`${APIS.admin.users.change.role.url}/testuser@example.com/INCORRECTROLE`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent.");
					done();
				});
		});
		it("Change Books | Invalid data sent.", (done: Mocha.Done): void => {
			agent
				.patch(`${APIS.admin.users.change.books.url}/testuser@example.com/incorrectmethod/name`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent.");
					done();
				});
		});
		it("Change Movies | Invalid data sent.", (done: Mocha.Done): void => {
			agent
				.patch(`${APIS.admin.users.change.movies.url}/testuser@example.com/incorrectmethod/name`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent.");
					done();
				});
		});
		it("Change Wheels | NaN value", (done: Mocha.Done): void => {
			agent
				.patch(`${APIS.admin.users.change.wheels.url}/testuser@example.com/NaN`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent, value should be a Number.");
					done();
				});
		});
		it("Change Money | NaN value", (done: Mocha.Done): void => {
			agent
				.patch(`${APIS.admin.users.change.money.url}/testuser@example.com/NaN`)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent, value should be a Number.");
					done();
				});
		});
	});
});
