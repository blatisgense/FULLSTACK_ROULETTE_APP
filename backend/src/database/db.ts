import { Pool, PoolConfig } from "pg";
import "dotenv/config";

const poolConnection: PoolConfig = process.env.DB_CONNECTION_STRING
	? {
			connectionString: process.env.DB_CONNECTION_STRING,
			ssl: { rejectUnauthorized: false },
		}
	: {
			password: process.env.PG_PASS,
			user: process.env.PG_USER,
			host: process.env.PG_HOST,
			port: Number(process.env.PG_PORT),
			database: process.env.PG_DB,
		};

export const pool: Pool = new Pool(poolConnection);
