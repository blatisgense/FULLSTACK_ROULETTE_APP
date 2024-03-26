import { PrizeName } from "@types";

export const random_prize = (): PrizeName => {
	let random: number = Math.floor(Math.random() * 100);
	switch (true) {
		case random <= 2:
			return "money";
		case 2 < random && random <= 10:
			return "wheels";
		case 10 < random && random <= 40:
			return "books";
		case 40 < random && random <= 70:
			return "movies";
		default:
			return "nothing";
	}
};
