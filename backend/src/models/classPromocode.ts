export class classPromocode {
	promo: string;
	promo_type: "movies" | "books" | "money" | "wheels";
	promo_value: string;
	constructor({ promo, promo_type, promo_value }: { promo: string; promo_type: "movies" | "books" | "money" | "wheels"; promo_value: string }) {
		this.promo = promo;
		this.promo_type = promo_type;
		this.promo_value = promo_value;
	}
}
