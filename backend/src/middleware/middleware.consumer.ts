import { MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { auth_middle } from "@middleware/auth_middle";
import { role_middle } from "@middleware/role_middle";
import { APIS } from "@helpers/API";

export const middlewareConsumer = (consumer: MiddlewareConsumer): void => {
	consumer.apply(auth_middle, role_middle(["ADMIN"])).forRoutes(
		{
			path: APIS.admin.users.change.money.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.books.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.role.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.wheels.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.movies.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.get.all.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.users.get.single.apiUrl,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.users.add.url,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.users.delete.apiUrl,
			method: RequestMethod.DELETE,
		},
		{
			path: APIS.admin.feedback.get.unread.url,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.feedback.read.all.url,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.feedback.read.single.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.products.delete.books.apiUrl,
			method: RequestMethod.DELETE,
		},
		{
			path: APIS.admin.products.get.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.products.add.movies.apiUrl,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.products.add.books.apiUrl,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.products.delete.movies.apiUrl,
			method: RequestMethod.DELETE,
		},
		{
			path: APIS.admin.promocode.get.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.promocode.add.url,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.promocode.delete.apiUrl,
			method: RequestMethod.DELETE,
		},
	);

	consumer.apply(auth_middle).forRoutes(
		{
			path: APIS.client.wheel.spin.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.client.data.get.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.client.promocode.verify.url,
			method: RequestMethod.POST,
		},
		{
			path: APIS.client.feedback.send.url,
			method: RequestMethod.POST,
		},
	);
};
