export const APIS = {
	auth: {
		login: {
			url: "/api/auth/login",
			method: "post",
		},
		register: {
			url: "/api/auth/register",
			method: "post",
		},
		logout: {
			url: "/api/auth/logout",
			method: "delete",
		},
	},
	client: {
		wheel: {
			spin: {
				url: "/api/client/wheel/spin",
				method: "get",
			},
		},
		data: {
			get: {
				url: "/api/client/data/get",
				method: "get",
			},
		},
		promocode: {
			verify: {
				url: "/api/client/promocode/verify",
				method: "post",
			},
		},
		feedback: {
			send: {
				url: "/api/client/feedback/send",
				method: "post",
			},
		},
	},
	admin: {
		users: {
			change: {
				money: {
					apiUrl: "/api/admin/users/change/money/:email/:value",
					url: "/api/admin/users/change/money",
					method: "patch",
				},
				wheels: {
					apiUrl: "/api/admin/users/change/wheels/:email/:value",
					url: "/api/admin/users/change/wheels",
					method: "patch",
				},
				role: {
					apiUrl: "/api/admin/users/change/role/:email/:value",
					url: "/api/admin/users/change/role",
					method: "patch",
				},
				movies: {
					apiUrl: "/api/admin/users/change/movies/:email/:method/:value",
					url: "/api/admin/users/change/movies",
					method: "patch",
				},
				books: {
					apiUrl: "/api/admin/users/change/books/:email/:method/:value",
					url: "/api/admin/users/change/books",
					method: "patch",
				},
			},
			add: {
				url: "/api/admin/users/add",
				method: "put",
			},
			delete: {
				apiUrl: "/api/admin/users/delete/:email",
				url: "/api/admin/users/delete",
				method: "delete",
			},
			get: {
				all: {
					url: "/api/admin/users/get/all",
					method: "get",
				},
				single: {
					apiUrl: "/api/admin/users/get/single/:email",
					url: "/api/admin/users/get/single",
					method: "get",
				},
			},
		},
		promocode: {
			get: {
				url: "/api/admin/promocodes/get",
				method: "get",
			},
			add: {
				url: "/api/admin/promocodes/add",
				method: "put",
			},
			delete: {
				apiUrl: "/api/admin/promocodes/delete/:promo",
				url: "/api/admin/promocodes/delete",
				method: "delete",
			},
		},
		products: {
			get: {
				url: "/api/admin/products/get",
				method: "get",
			},
			add: {
				movies: {
					apiUrl: "/api/admin/products/add/movies/:name",
					url: "/api/admin/products/add/movies",
					method: "put",
				},
				books: {
					apiUrl: "/api/admin/products/add/books/:name",
					url: "/api/admin/products/add/books",
					method: "put",
				},
			},
			delete: {
				movies: {
					apiUrl: "/api/admin/products/delete/movies/:name",
					url: "/api/admin/products/delete/movies",
					method: "delete",
				},
				books: {
					apiUrl: "/api/admin/products/delete/books/:name",
					url: "/api/admin/products/delete/books",
					method: "delete",
				},
			},
		},
		feedback: {
			read: {
				single: {
					apiUrl: "/api/admin/feedback/read/single/:id",
					url: "/api/admin/feedback/read/single",
					method: "patch",
				},
				all: {
					url: "/api/admin/feedback/read/all",
					method: "patch",
				},
			},
			get: {
				unread: {
					url: "/api/admin/feedback/get/unread",
					method: "get",
				},
			},
		},
	},
};
