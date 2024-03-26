import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";
import { alias } from "./vite.config.ts";

export default defineConfig({
	plugins: [tsconfigPaths(), vue()],
	test: {
		include: ["./tests/unit/**/*.test.ts", "./tests/components/**/*.test.ts"],
		exclude: ["./node_modules/**/*.*", "./src/**/*.*", "./cypress/**/*.*"],
		globals: true,
		environment: "jsdom",
		reporters: ["html", "default"],
		name: "FullStack Magic Wheel",
		coverage: {
			reportsDirectory: "tests/results/coverage",
			enabled: true,
			provider: "v8",
			reporter: ["html", "json"],
		},
	},
	resolve: {
		alias: alias,
	},
});
