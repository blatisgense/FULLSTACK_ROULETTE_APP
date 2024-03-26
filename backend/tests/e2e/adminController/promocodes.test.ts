import { agent, authorize_admin, expect, tokens } from "@tests/tests.config";
import { APIS } from "@helpers/API";
import request from "superagent";
import { Promocode } from "@types";

describe("Admin Controller | Promocodes", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	it("Promocodes testing cycle", async (): Promise<void> => {
		let add: request.Response = await agent.put(APIS.admin.promocode.add.url).set("cookie", tokens.admin_access_cookie).send({
			promo: "testpromo",
			type: "wheels",
			value: "10",
		});
		expect(add).to.have.status(200);
		expect(add.body.msg).to.be.equal("Promocode testpromo created successfully.");

		add = await agent.put(APIS.admin.promocode.add.url).set("cookie", tokens.admin_access_cookie).send({
			promo: "testpromo",
			type: "wheels",
			value: "10",
		});
		expect(add).to.have.status(401);
		expect(add.body.error).to.be.equal("This Promo already exist.");

		let get: request.Response = await agent.get(APIS.admin.promocode.get.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body).to.be.an("array");
		expect(get.body.find((promo: Promocode): boolean => promo.promo === "testpromo")).to.deep.equal({ promo: "testpromo", promo_type: "wheels", promo_value: "10" });

		let del: request.Response = await agent.delete(`${APIS.admin.promocode.delete.url}/testpromo`).set("cookie", tokens.admin_access_cookie);
		expect(del).to.have.status(200);
		expect(del.body.msg).to.be.equal("Promocode testpromo deleted successfully.");
	});
	describe("Promocodes errors", (): void => {
		it("Not enough parameters", (done: Mocha.Done): void => {
			agent
				.put(APIS.admin.promocode.add.url)
				.set("cookie", tokens.admin_access_cookie)
				.send({})
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Not enough parameters, check request.body.");
					done();
				});
		});
		it("Invalid data sent", (done: Mocha.Done): void => {
			agent
				.put(APIS.admin.promocode.add.url)
				.set("cookie", tokens.admin_access_cookie)
				.send({
					promo: "testpromo",
					type: "invalidtype",
					value: "10",
				})
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent, check request.body.");
					done();
				});
		});
		it("Value must be a number", (done: Mocha.Done): void => {
			agent
				.put(APIS.admin.promocode.add.url)
				.set("cookie", tokens.admin_access_cookie)
				.send({
					promo: "testpromo",
					type: "wheels",
					value: "Nan",
				})
				.end((_err, res: request.Response): void => {
					expect(res).to.have.status(401);
					expect(res.body.error).to.be.equal("Invalid data sent, value must be a number");
					done();
				});
		});
	});
});
