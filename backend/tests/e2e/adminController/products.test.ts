import { agent, authorize_admin, expect, tokens } from "@tests/tests.config";
import { APIS } from "@helpers/API";
import request from "superagent";

describe("Admin Controller | Products", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	it("Books testing cycle", async (): Promise<void> => {
		let add: request.Response = await agent.put(`${APIS.admin.products.add.books.url}/testname`).set("cookie", tokens.admin_access_cookie);
		expect(add).to.have.status(200);
		expect(add.body.msg).to.be.equal("Book testname added successfully.");

		add = await agent.put(`${APIS.admin.products.add.books.url}/testname`).set("cookie", tokens.admin_access_cookie);
		expect(add).to.have.status(401);
		expect(add.body.error).to.be.equal("This book already exist.");

		let get: request.Response = await agent.get(APIS.admin.products.get.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body.products_books.includes("testname")).to.be.equal(true);

		let del: request.Response = await agent.delete(`${APIS.admin.products.delete.books.url}/testname`).set("cookie", tokens.admin_access_cookie);
		expect(del).to.have.status(200);
		expect(del.body.msg).to.be.equal("Book testname deleted successfully.");

		get = await agent.get(APIS.admin.products.get.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body.products_books.includes("testname")).to.be.equal(false);
	});
	it("Movies testing cycle", async (): Promise<void> => {
		let add: request.Response = await agent.put(`${APIS.admin.products.add.movies.url}/testname`).set("cookie", tokens.admin_access_cookie);
		expect(add).to.have.status(200);
		expect(add.body.msg).to.be.equal("Movie testname added successfully.");

		add = await agent.put(`${APIS.admin.products.add.movies.url}/testname`).set("cookie", tokens.admin_access_cookie);
		expect(add).to.have.status(401);
		expect(add.body.error).to.be.equal("This movie already exist.");

		let get: request.Response = await agent.get(APIS.admin.products.get.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body.products_movies.includes("testname")).to.be.equal(true);

		let del: request.Response = await agent.delete(`${APIS.admin.products.delete.movies.url}/testname`).set("cookie", tokens.admin_access_cookie);
		expect(del).to.have.status(200);
		expect(del.body.msg).to.be.equal("Movie testname deleted successfully.");

		get = await agent.get(APIS.admin.products.get.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body.products_movies.includes("testname")).to.be.equal(false);
	});
});
