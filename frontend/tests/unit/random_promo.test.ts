import { expect, test } from "vitest";
import { random_promocode } from "@helpers/random_promo.ts";

test("Get Random Promocode", (): void => {
	let promo: string = random_promocode();
	expect(typeof promo).toBe("string");
	expect(promo.length).toBe(8);
});
