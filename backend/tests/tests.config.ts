import chai from "chai";
import chaiHttp from "chai-http";
import request from "superagent";
import { Port } from "@/main";
import { APIS } from "@helpers/API";

chai.use(chaiHttp);
export const agent: ChaiHttp.Agent = chai.request.agent(`http://localhost:${Port}`);
export const expect: Chai.ExpectStatic = chai.expect;

export let tokens: {
	admin_access_cookie: string;
	admin_refresh_cookie: string;
	user_access_cookie: string;
} = {
	admin_access_cookie: "",
	admin_refresh_cookie: "",
	user_access_cookie: "",
};

export function parse_cookies(key: "refresh_token=" | "access_token=", arr: Array<string>): string {
	return arr.find((el: string): boolean => el.includes(key)).split(";")[0];
}
export function set_cookies(arr: Array<string>): void {
	tokens.admin_access_cookie = parse_cookies("access_token=", arr);
	tokens.admin_refresh_cookie = parse_cookies("refresh_token=", arr);
}

export async function authorize_admin(): Promise<void> {
	let response: request.Response = await agent.post(APIS.auth.login.url).send({
		email: "lavr.marudenko@gmail.com",
		password: "123456",
	});
	expect(response).to.have.status(200);
	expect(response).to.have.cookie("access_token");
	set_cookies(response.headers["set-cookie"]);
}
export async function authorize_user(): Promise<void> {
	let response: request.Response = await agent.post(APIS.auth.login.url).send({
		email: "lavr.marudenk@gmail.com",
		password: "123456",
	});
	expect(response).to.have.status(200);
	expect(response).to.have.cookie("access_token");
	tokens.user_access_cookie = parse_cookies("access_token=", response.headers["set-cookie"]);
}
