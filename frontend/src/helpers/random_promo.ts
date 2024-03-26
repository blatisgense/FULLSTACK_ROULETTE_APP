let pull: string = "abcdefghijkmlnopqrstyuoxvzABCDEFGHIJKMLNOPQRSTYOUXVZ";
export function random_promocode(): string {
	let promo: string = "";
	for (let i = 0; i < 8; i++) {
		let random = Math.floor(Math.random() * pull.length);
		promo += pull[random];
	}
	return promo;
}
