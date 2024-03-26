import * as chai from "chai";

const expect: Chai.ExpectStatic = chai.expect;
import { classUser } from "@models/ClassUser";
import { classPromocode } from "@models/classPromocode";
import { User } from "@types";
import { Promocode } from "@types";

let example_user: User = {
	user_name: "lavrik",
	user_email: "email@gmail.com",
	user_password: "123456",
	user_role: "USER",
	user_wheels: 0,
	user_money: 0,
	user_movies: [],
	user_books: [],
};

let example_promo: Promocode = {
	promo: "test",
	promo_value: "testing",
	promo_type: "movies",
};

describe("Classes", (): void => {
	it("User class", (done: Mocha.Done): void => {
		let user: classUser = new classUser({
			name: "lavrik",
			email: "email@gmail.com",
			password: "123456",
		});
		expect(user).to.deep.equal(example_user);
		done();
	});

	it("Promocode class", (done: Mocha.Done): void => {
		let promocode: classPromocode = new classPromocode({
			promo: "test",
			promo_value: "testing",
			promo_type: "movies",
		});
		expect(promocode).to.deep.equal(example_promo);
		done();
	});
});
