import { table_parse } from "@helpers/table_parse.ts";
import { test, expect } from "vitest";

test("Table Parser", (): void => {
	let str: string = table_parse(["bim", "bam", "foo", "bar"]);
	expect(str).toBe("bim, bam, foo, bar");
	let empty: string = table_parse([]);
	expect(empty).toBe("");
});
