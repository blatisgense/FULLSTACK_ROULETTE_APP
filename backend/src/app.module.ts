import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthController } from "@controllers/authController";
import { ClientController } from "@controllers/clientController";
import { AdminController } from "@controllers/adminController";

import { middlewareConsumer } from "@middleware/middleware.consumer";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
	],
	controllers: [AuthController, ClientController, AdminController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		middlewareConsumer(consumer);
	}
}
