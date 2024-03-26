/// <reference types="vite/client" />

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.webp";
declare module "*.avif";
declare module "*.ts";
declare module "*.vue";

declare global {
	interface ProcessEnv {
		VITE_BACKEND_URL: string;
		VITE_APP_PORT: string;
	}
}

export {};
