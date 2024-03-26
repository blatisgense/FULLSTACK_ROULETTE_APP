import sharp, { AvifOptions, WebpOptions } from "sharp";
import { glob } from "glob";

export function parse_filename(file: string): string {
	let path: Array<string> = file.split(".");
	path.pop();
	return path.join(".");
}

export async function to_webp(glob_expression: string, stats?: boolean, config?: WebpOptions): Promise<void> {
	const files: Array<string> = await glob(glob_expression);
	files.map((file: string): void => {
		try {
			let path: string = parse_filename(file);
			if (stats) console.log(`'${file}' to '${path}.webp'`);
			sharp(file).webp(config).toFile(`${path}.webp`);
		} catch (e) {
			console.log({ error: e });
		}
	});
}

export async function to_avif(glob_expression: string, stats?: boolean, config?: AvifOptions): Promise<void> {
	const files: Array<string> = await glob(glob_expression);
	files.map((file: string): void => {
		try {
			let path: string = parse_filename(file);
			if (stats) console.log(`'${file}' to '${path}.avif'`);
			sharp(file).avif(config).toFile(`${path}.avif`);
		} catch (e) {
			console.log({ error: e });
		}
	});
}

await to_webp("./src/assets/media/**/*.{png, jpg, jpeg}", true, { lossless: true, quality: 85 });
// await to_avif("./src/assets/media/**/*.{jpg, jpeg}", true, { lossless: true, quality: 85 });
