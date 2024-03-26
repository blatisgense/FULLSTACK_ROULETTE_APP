import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";

import { AppModule } from "@/app.module";
import { swagger_config } from "@/swagger_config";

export const Port: number = Number(process.env.APP_PORT);

export async function app(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule, {
		cors: {
			credentials: true,
			origin: true,
		},
	});
	SwaggerModule.setup("api/swagger", app, swagger_config);
	app.use(cookieParser());
	await app.listen(Port, (): void => console.log(`[STARTED ON ${Port}...]`));
}

app().then();
