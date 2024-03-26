export function table_parse(str: string[] | null) {
	if (str == null) return "";
	return str.join(", ").replaceAll(/[[\]"]+/g, "");
}
