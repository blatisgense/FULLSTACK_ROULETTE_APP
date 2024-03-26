import request from "superagent";
import { APIS } from "@helpers/API";
import { tokens, agent, expect, authorize_admin, authorize_user } from "@tests/tests.config";
import { PrizeName } from "@types";

describe("Client Controller", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	describe("Should gets success", (): void => {
		it("Get Data", (done: Mocha.Done): void => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", tokens.admin_access_cookie)
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.user_email).to.be.equal("lavr.marudenko@gmail.com");
					done();
				});
		});
		it("Send Feedback", (done: Mocha.Done): void => {
			agent
				.post(APIS.client.feedback.send.url)
				.set("cookie", tokens.admin_access_cookie)
				.send({ msg: "message", name: "lavrik" })
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(200);
					expect(res.body.msg).to.be.equal("Massage sent successfully, you'll receive feedback by Email.");
					done();
				});
		});
		it("Verify Promocode", async (): Promise<void> => {
			let user_before: request.Response = await agent.get(APIS.client.data.get.url).set("cookie", tokens.admin_access_cookie);
			expect(user_before).to.have.status(200);

			expect(await agent.put(APIS.admin.promocode.add.url).set("cookie", tokens.admin_access_cookie).send({ promo: "promobimbam", type: "wheels", value: "10" })).to.have.status(200);

			let verify: request.Response = await agent.post(APIS.client.promocode.verify.url).set("cookie", tokens.admin_access_cookie).send({ promocode: "promobimbam" });
			expect(verify).to.have.status(200);
			expect(verify.body.msg).to.be.equal("You've got:<br>Wheels 10");

			let user_after: request.Response = await agent.get(APIS.client.data.get.url).set("cookie", tokens.admin_access_cookie);
			expect(user_after).to.have.status(200);
			expect(user_after.body.user_wheels - user_before.body.user_wheels).to.be.equal(10);
		});
		it("Spin Wheel", async (): Promise<void> => {
			let user_before: request.Response = await agent.get(APIS.client.data.get.url).set("cookie", tokens.admin_access_cookie);
			expect(user_before).to.have.status(200);

			expect(Number(user_before.body.user_wheels)).to.be.greaterThanOrEqual(1);

			let spin: request.Response = await agent.get(APIS.client.wheel.spin.url).set("cookie", tokens.admin_access_cookie);
			expect(spin).to.have.status(200);

			let prize: PrizeName = spin.body.prize;

			let user_after: request.Response = await agent.get(APIS.client.data.get.url).set("cookie", tokens.admin_access_cookie);
			expect(user_after).to.have.status(200);

			switch (prize) {
				case "movies":
					expect(user_after.body.user_movies.includes(spin.body.product_name));
					break;

				case "books":
					expect(user_after.body.user_books.includes(spin.body.product_name));
					break;

				case "nothing":
					expect(user_after.body.user_movies).to.deep.equals(user_before.body.user_movies);
					expect(user_after.body.user_books).to.deep.equals(user_before.body.user_books);
					expect(user_after.body.user_money).to.be.equals(user_before.body.user_money);
					break;

				case "wheels":
					expect(user_after.body.user_wheels - user_before.body.user_wheels).to.be.equal(5);
					return;

				case "money":
					expect(user_after.body.user_money - user_before.body.user_money).to.be.equal(500);
					break;
			}
			expect(user_before.body.user_wheels - user_after.body.user_wheels).to.be.equal(1);
		});
	});

	describe("Should gets errors", (): void => {
		describe("Send Feedback", (): void => {
			it("Invalid data sent", (done: Mocha.Done): void => {
				agent
					.post(APIS.client.feedback.send.url)
					.set("cookie", tokens.admin_access_cookie)
					.send({})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("Invalid data sent.");
						done();
					});
			});
		});
		describe("Verify Promocode", (): void => {
			it("Invalid data sent", (done: Mocha.Done): void => {
				agent
					.post(APIS.client.promocode.verify.url)
					.set("cookie", tokens.admin_access_cookie)
					.send({})
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("Invalid data sent.");
						done();
					});
			});
			it("Invalid data sent", (done: Mocha.Done): void => {
				agent
					.post(APIS.client.promocode.verify.url)
					.set("cookie", tokens.admin_access_cookie)
					.send({ promocode: "fake_promocode" })
					.end((_err, res: request.Response): void => {
						expect(res).to.have.status(401);
						expect(res.body.error).to.be.equal("Promocode not found.");
						done();
					});
			});
		});
		describe("Spin Wheel", (): void => {
			it("You have not enough wheels for spin.", async (): Promise<void> => {
				await authorize_user();
				let spin: request.Response = await agent.get(APIS.client.wheel.spin.url).set("cookie", tokens.user_access_cookie);
				expect(spin).to.have.status(401);
				expect(spin.body.error).to.be.equal("You have not enough wheels for spin.");
			});
		});
	});
});
