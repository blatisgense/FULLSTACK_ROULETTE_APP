import { agent, authorize_admin, expect, tokens } from "@tests/tests.config";
import { APIS } from "@helpers/API";
import request from "superagent";

describe("Admin Controller | Feedback", (): void => {
	beforeEach(async (): Promise<void> => await authorize_admin());
	it("Read all messages", async (): Promise<void> => {
		let read: request.Response = await agent.patch(APIS.admin.feedback.read.all.url).set("cookie", tokens.admin_access_cookie);
		expect(read).to.have.status(200);
		expect(read.body.msg).to.be.equal("All messages read.");

		let get: request.Response = await agent.get(APIS.admin.feedback.get.unread.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body).to.be.an("array");
		expect(get.body.length).to.be.equal(0);
	});
	it("Read single message", async (): Promise<void> => {
		await agent.post(APIS.client.feedback.send.url).set("cookie", tokens.admin_access_cookie).send({ msg: "message", name: "lavrik" });
		await agent.post(APIS.client.feedback.send.url).set("cookie", tokens.admin_access_cookie).send({ msg: "message", name: "lavrik" });

		let get: request.Response = await agent.get(APIS.admin.feedback.get.unread.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body).to.be.an("array");
		expect(get.body.length).to.be.equal(2);

		let read: request.Response = await agent.patch(`${APIS.admin.feedback.read.single.url}/${get.body[0].msg_id}`).set("cookie", tokens.admin_access_cookie);
		expect(read).to.have.status(200);
		expect(read.body.msg).to.be.equal(`Message id${get.body[0].msg_id} read.`);

		get = await agent.get(APIS.admin.feedback.get.unread.url).set("cookie", tokens.admin_access_cookie);
		expect(get).to.have.status(200);
		expect(get.body).to.be.an("array");
		expect(get.body.length).to.be.equal(1);
	});
	it("Get unread messages", (done: Mocha.Done): void => {
		agent
			.get(APIS.admin.feedback.get.unread.url)
			.set("cookie", tokens.admin_access_cookie)
			.end((_err, res: request.Response): void => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an("array");
				expect(res.body.length).to.be.equal(1);
				done();
			});
	});
});
