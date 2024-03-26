import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
	e2e: {
		viewportHeight: 1080,
		viewportWidth: 1920,
		specPattern: "./tests/e2e/**/**.test.ts",
		taskTimeout: 15000,
		setupNodeEvents(on: Cypress.PluginEvents) {
			on("file:preprocessor", vitePreprocessor());
		},
	},
});
