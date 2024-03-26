declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ACCESS_TOKEN_SECRET: string;
			UPDATE_TOKEN_SECRET: string;
			APP_PORT: number;
			PG_HOST: string;
			PG_PORT: number;
			PG_USER: string;
			PG_PASS: string;
			PG_DB: string;
			DB_CONNECTION_STRING: string | undefined;
		}
	}
}
