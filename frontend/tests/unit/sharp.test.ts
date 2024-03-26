import { test, expect, describe } from "vitest";
import { to_webp, parse_filename, to_avif } from "@helpers/sharp.ts";
import { glob } from "glob";

describe("Sharp Tests", (): void => {
	test("Make Webp Images", async (): Promise<void> => {
		const files: Array<string> = await glob("./src/assets/media/**/*.{png, jpg, jpeg}");
		if (files.length > 0) {
			await to_webp("./src/assets/media/**/*.{png, jpg, jpeg}", true, { lossless: true, quality: 85 });
			const webp: Array<string> = await glob("./src/assets/media/**/*.webp");
			expect(webp.length).toBeGreaterThan(0);
		}
	});

	test("Make Avif Images", async (): Promise<void> => {
		const files: Array<string> = await glob("./src/assets/media/**/*.{jpg, jpeg}");
		if (files.length > 0) {
			await to_avif("./src/assets/media/**/*.{jpg, jpeg}", true, { lossless: true, quality: 85 });
			const avif: Array<string> = await glob("./src/assets/media/**/*.avif");
			expect(avif.length).toBeGreaterThan(0);
		}
	});

	test("Parse Filename", (): void => {
		let path: string = parse_filename("./src/assets/media/images/test.xl.png");
		expect(path).toEqual("./src/assets/media/images/test.xl");
	});
});
