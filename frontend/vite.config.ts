import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { fileURLToPath } from "node:url";

export const alias: Array<{ find: string; replacement: string }> = [
	{
		find: "@",
		replacement: fileURLToPath(new URL("./src", import.meta.url)),
	}, //src
	{
		find: "@app",
		replacement: fileURLToPath(new URL("./src/App.vue", import.meta.url)),
	}, //,main app component
	{
		find: "@types",
		replacement: fileURLToPath(new URL("./src/index.d.ts", import.meta.url)),
	}, //types store
	{
		find: "@styles",
		replacement: fileURLToPath(new URL("./src/assets/styles", import.meta.url)),
	}, //styles
	{
		find: "@assets",
		replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
	}, //assets
	{
		find: "@helpers",
		replacement: fileURLToPath(new URL("./src/helpers", import.meta.url)),
	}, //helper's functions, composable, and other tools
	{
		find: "@router",
		replacement: fileURLToPath(new URL("./src/router", import.meta.url)),
	}, //router.ts and routes
	{
		find: "@state",
		replacement: fileURLToPath(new URL("./src/state", import.meta.url)),
	}, //pinia.ts and stores
	{
		find: "@media",
		replacement: fileURLToPath(new URL("./src/assets/media", import.meta.url)),
	}, //media files (img, svg)
	{
		find: "@ui",
		replacement: fileURLToPath(new URL("./src/components/ui", import.meta.url)),
	}, //ui components
	{
		find: "@pages",
		replacement: fileURLToPath(new URL("./src/components/pages", import.meta.url)),
	}, //pages components
	{
		find: "@sections",
		replacement: fileURLToPath(new URL("./src/components/sections", import.meta.url)),
	}, //sections components
	{
		find: "@views",
		replacement: fileURLToPath(new URL("./src/components/views", import.meta.url)),
	}, //views components
	{
		find: "@global",
		replacement: fileURLToPath(new URL("./src/components/global", import.meta.url)),
	}, //global components
	{
		find: "@axios",
		replacement: fileURLToPath(new URL("./src/helpers/axios", import.meta.url)),
	}, //axios server functions
	{
		find: "@public",
		replacement: fileURLToPath(new URL("./public", import.meta.url)),
	}, //public static files
	{
		find: "@tests",
		replacement: fileURLToPath(new URL("./tests", import.meta.url)),
	}, //tests folder files
];

export default defineConfig({
	build: {
		target: "ESNext",
		rollupOptions: {
			external: ["sharp"],
		},
	},
	server: {
		port: Number(process.env.VITE_APP_PORT),
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
	plugins: [
		vue(),
		ViteImageOptimizer({
			ansiColors: true,
			includePublic: true,
			logStats: true,
			cache: false,
		}),
	],
	resolve: {
		alias: alias,
	},
	css: {
		postcss: {
			plugins: [autoprefixer],
		},
	},
});
