import { OpenAPIObject } from "@nestjs/swagger";
import { ParameterObject, ResponseObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { APIS } from "@helpers/API";

let param_access_token: ParameterObject = {
	name: "Access Token",
	in: "cookie",
	required: true,
	description: "Access token, to verify authentication. Expires in 30 minutes.",
};
let param_refresh_token: ParameterObject = {
	name: "Refresh Token",
	in: "cookie",
	required: true,
	description: "Refresh token, to restore access token. Expires in 36 hours.",
};
let param_email: ParameterObject = {
	name: "Email",
	in: "path",
	required: true,
	description: "User's email",
	example: "email@example.com",
};

let invalid_data_error: ResponseObject = {
	description: "Invalid data sent / bad request.",
	content: {
		"application/json": {
			schema: {
				type: "object",
				example: [
					"//examples",
					{ error: "Invalid data sent, value must be a number." },
					{ error: "Invalid data sent, role must be a 'ADMIN' or 'USER'" },
					{ error: "Invalid data sent, method must be a 'delete' or 'add'" },
					{ error: "You have not enough wheels for spin." },
				],
			},
		},
	},
};
let auth_error: ResponseObject = {
	description: "Authentication failed | Access denied.",
	content: {
		"application/json": {
			schema: {
				type: "object",
				example: ["//examples", { error: "You're token expired or replaced, please authorize again!" }, { error: "Access denied." }],
			},
		},
	},
};
let internal_error: ResponseObject = {
	description: "Internal server error",
	content: {
		"application/json": {
			schema: {
				type: "object",
				example: { error: "Error message" },
			},
		},
	},
};

export const swagger_config: OpenAPIObject = {
	openapi: "3.0.0",
	info: {
		title: "Magic Wheel",
		description: "books of APIs for Magic Wheel",
		version: "1.0",
		contact: {
			name: "Lavrentij",
			url: "https://t.me/Blatisgense",
			email: "lavr.marudenko@gmail.com",
		},
	},
	paths: {
		[APIS.auth.login.url]: {
			[APIS.auth.login.method]: {
				tags: ["Auth"],
				summary: "Auth Controller | Login",
				description: "Login into account, set auth tokens into cookies.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								example: { email: "email@blatisgense.com", password: "password" },
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Successfully set auth tokens into cookies.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "You've logged in successfully." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"500": internal_error,
				},
			},
		},

		[APIS.auth.register.url]: {
			[APIS.auth.register.method]: {
				tags: ["Auth"],
				summary: "Auth Controller | Registration.",
				description: "Add new User.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								example: { email: "user@example.com", password: "password", name: "user" },
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Add new User.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Success!<br> You can Sign In with your data." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"500": internal_error,
				},
			},
		},

		[APIS.auth.logout.url]: {
			[APIS.auth.logout.method]: {
				tags: ["Auth"],
				summary: "Auth Controller | Logout",
				description: "Clears auth tokens within cookies.",
				responses: {
					"200": {
						description: "Successfully clears auth tokens within cookies.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "You've logout successfully." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"500": internal_error,
				},
			},
		},

		[APIS.client.wheel.spin.url]: {
			[APIS.client.wheel.spin.method]: {
				tags: ["Client"],
				summary: "Client Controller | Spin 'Magic Wheel'.",
				description: "Spin 'Magic Wheel', return prize data.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "Successfully Spin 'Magic Wheel'.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { product_name: null, prize: "wheels" },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.client.data.get.url]: {
			[APIS.client.data.get.method]: {
				tags: ["Client"],
				summary: "Client Controller | Get User data.",
				description: "Return User data.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "Return User data.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: {
										user_email: "lavr.marudenko@gmail.com",
										user_name: "Lavrentij",
										user_role: "ADMIN",
										user_money: 1000,
										user_wheels: 30,
										user_movies: ["movie"],
										user_books: ["book"],
									},
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.client.promocode.verify.url]: {
			[APIS.client.promocode.verify.method]: {
				tags: ["Client"],
				summary: "Client Controller | Verify promo.",
				description: "Verify promocode.",
				parameters: [param_access_token, param_refresh_token],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								example: { promocode: "NdjnNdlsn" },
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Promocode successfully verified.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "You've got: 10 wheels." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.client.feedback.send.url]: {
			[APIS.client.feedback.send.method]: {
				tags: ["Client"],
				summary: "Client Controller | Send feedback.",
				description: "Send feedback to admins.",
				parameters: [param_access_token, param_refresh_token],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								example: { msg: "Thanks for what you've done!", name: "Lavrentij" },
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Feedback sent.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Massage sent successfully, you'll receive feedback by Email." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.change.money.apiUrl]: {
			[APIS.admin.users.change.money.method]: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin Controller | Change User's money",
				description: "Change User's money.",
				parameters: [
					param_access_token,
					param_refresh_token,
					param_email,
					{
						name: "Value",
						in: "path",
						required: true,
						description: "New value",
						example: "5000",
					},
				],
				responses: {
					"200": {
						description: "Money changed",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Money of lavr.marudenko@gmail.com changed to 1000." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.change.wheels.apiUrl]: {
			[APIS.admin.users.change.wheels.method]: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin Controller | Change User's wheels",
				description: "Change User's wheels.",
				parameters: [
					param_access_token,
					param_refresh_token,
					param_email,
					{
						name: "Value",
						in: "path",
						required: true,
						description: "New value",
						example: "50",
					},
				],
				responses: {
					"200": {
						description: "Wheels changed",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Wheels of lavr.marudenko@gmail.com changed to 30." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.change.role.apiUrl]: {
			[APIS.admin.users.change.role.method]: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin Controller | Change User's role",
				description: "Change User's role.",
				parameters: [param_access_token, param_refresh_token, param_email, { in: "path", description: "New role", example: "ADMIN | USER", name: "value" }],
				responses: {
					"200": {
						description: "Role changed",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Role of lavr.marudenko@gmail.com changed to ADMIN." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.change.movies.apiUrl]: {
			[APIS.admin.users.change.movies.method]: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin Controller | Change User's movies",
				description: "Change User's movies.",
				parameters: [
					param_access_token,
					param_refresh_token,
					param_email,
					{ in: "path", description: "Method", example: "delete | add", name: "method" },
					{ in: "path", description: "Product name", example: "Raid", name: "value" },
				],
				responses: {
					"200": {
						description: "Movies added/deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Movie lavr.marudenko@gmail.com added successfully." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.change.books.apiUrl]: {
			[APIS.admin.users.change.books.method]: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin Controller | Change User's books",
				description: "Change User's books.",
				parameters: [
					param_access_token,
					param_refresh_token,
					param_email,
					{ in: "path", description: "Method", example: "delete | add", name: "method" },
					{ in: "path", description: "Product name", example: "Raid", name: "value" },
				],
				responses: {
					"200": {
						description: "Book added/deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Book lavr.marudenko@gmail.com added successfully." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.add.url]: {
			[APIS.admin.users.add.method]: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin Controller | Create User",
				description: "Create new User.",
				parameters: [param_access_token, param_refresh_token],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								example: { email: "user@example.com", password: "password", name: "user" },
							},
						},
					},
				},
				responses: {
					"200": {
						description: "User created successfully.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "User lavr.marudenko@gmail.com created." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.delete.apiUrl]: {
			[APIS.admin.users.delete.method]: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin Controller | Delete User",
				description: "Delete User.",
				parameters: [param_access_token, param_refresh_token, param_email],
				responses: {
					"200": {
						description: "User deleted successfully.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "User lavr.marudenko@gmail.com deleted." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.get.all.url]: {
			[APIS.admin.users.get.all.method]: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin Controller | Get all Users",
				description: "Get array of all Users.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "Array of all Users returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "array",
									example: [
										{
											user_email: "lavr.marudenko@gmail.com",
											user_name: "Lavrentij",
											user_role: "ADMIN",
											user_money: 1000,
											user_wheels: 30,
											user_movies: ["movie"],
											user_books: ["book"],
										},
										"Users...",
									],
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.users.get.single.apiUrl]: {
			[APIS.admin.users.get.single.method]: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin Controller | Get single User",
				description: "Get single User.",
				parameters: [param_access_token, param_refresh_token, param_email],
				responses: {
					"200": {
						description: "User's data returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: {
										user_email: "lavr.marudenko@gmail.com",
										user_name: "Lavrentij",
										user_role: "ADMIN",
										user_money: 1000,
										user_wheels: 30,
										user_movies: ["movie"],
										user_books: ["book"],
									},
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.feedback.get.unread.url]: {
			[APIS.admin.feedback.get.unread.method]: {
				tags: ["Admin", "Admin_feedback"],
				summary: "Admin Controller | Get unread messages",
				description: "Get unread messages.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "Messages successfully returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: {
										msg: "Text bim bim bam bam",
										msg_id: 12,
										status: "unread",
										sender_email: "example@example.com",
										sender_name: "lavrik",
									},
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.feedback.read.single.apiUrl]: {
			[APIS.admin.feedback.read.single.method]: {
				tags: ["Admin", "Admin_feedback"],
				summary: "Admin Controller | Read single message",
				description: "Read single message by id.",
				parameters: [param_access_token, param_refresh_token, { in: "path", description: "Message's id", example: "34", name: "id" }],
				responses: {
					"200": {
						description: "Message status changed to 'read'.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Message id12 read" },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.feedback.read.all.url]: {
			[APIS.admin.feedback.read.all.method]: {
				tags: ["Admin", "Admin_feedback"],
				summary: "Admin Controller | Read all messages",
				description: "Read all messages.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "All messages status changed to 'read'.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "All messages read" },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.promocode.get.url]: {
			[APIS.admin.promocode.get.method]: {
				tags: ["Admin", "Admin_promocodes"],
				summary: "Admin Controller | Get all promocodes",
				description: "Get all promocodes.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "Promocodes returned to client.",
						content: {
							"application/json": {
								example: [
									{
										promo: "sdifjdfn",
										promo_value: "10",
										promo_type: "wheels",
									},
									"Promocodes...",
								],
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.promocode.add.url]: {
			[APIS.admin.promocode.add.method]: {
				tags: ["Admin", "Admin_promocodes"],
				summary: "Admin Controller | Add new promocode",
				description: "Add new promocode.",
				parameters: [param_access_token, param_refresh_token],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								example: {
									promo: "sdifjdfn",
									value: "10",
									type: "wheels",
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Promocode created.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Promocode ${req.body.promo} created successfully." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.promocode.delete.apiUrl]: {
			[APIS.admin.promocode.delete.method]: {
				tags: ["Admin", "Admin_promocodes"],
				summary: "Admin Controller | Delete promocode",
				description: "Delete promocode.",
				parameters: [param_access_token, param_refresh_token, { in: "path", description: "promocode to delete", example: "sdfsdfs", name: "promo" }],
				responses: {
					"200": {
						description: "Promocode deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Promocode dsadasd deleted." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.products.add.movies.apiUrl]: {
			[APIS.admin.products.add.movies.method]: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin Controller | Add new movies",
				description: "Add new movies.",
				parameters: [param_access_token, param_refresh_token, { in: "path", description: "Product's name", example: "Raid", name: "name" }],
				responses: {
					"200": {
						description: "Movie added.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "movie Raid added." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.products.add.books.apiUrl]: {
			[APIS.admin.products.add.books.method]: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin Controller | Add new books",
				description: "Add new books.",
				parameters: [param_access_token, param_refresh_token, { in: "path", description: "Product's name", example: "Raid", name: "name" }],
				responses: {
					"200": {
						description: "Book added.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Book Harry Potter added." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.products.delete.movies.apiUrl]: {
			[APIS.admin.products.delete.movies.method]: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin Controller | Delete movies",
				description: "Delete movies.",
				parameters: [param_access_token, param_refresh_token, { in: "path", description: "Product's name", example: "Raid", name: "name" }],
				responses: {
					"200": {
						description: "Movies deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Movie Raid deleted." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.products.delete.books.apiUrl]: {
			[APIS.admin.products.delete.books.method]: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin Controller | Delete books",
				description: "Delete books.",
				parameters: [param_access_token, param_refresh_token, { in: "path", description: "Product's name", example: "Raid", name: "name" }],
				responses: {
					"200": {
						description: "Books deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									example: { msg: "Book Harry Potter deleted." },
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},

		[APIS.admin.products.get.url]: {
			[APIS.admin.products.get.method]: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin Controller | Get all products",
				description: "Get all products.",
				parameters: [param_access_token, param_refresh_token],
				responses: {
					"200": {
						description: "Products returned to client.",
						content: {
							"application/json": {
								example: {
									products_books: ["...books"],
									products_movies: ["...movies"],
								},
							},
						},
					},
					"401": invalid_data_error,
					"403": auth_error,
					"500": internal_error,
				},
			},
		},
	},
};
