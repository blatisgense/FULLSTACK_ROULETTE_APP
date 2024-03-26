const url: string = import.meta.env.VITE_BACKEND_URL;
export const APIS = {
	auth: {
		login: {
			url: `${url}/api/auth/login`,
			method: "post",
		},
		register: {
			url: `${url}/api/auth/register`,
			method: "post",
		},
		logout: {
			url: `${url}/api/auth/logout`,
			method: "delete",
		},
	},
	client: {
		wheel: {
			spin: {
				url: `${url}/api/client/wheel/spin`,
				method: "get",
			},
		},
		data: {
			get: {
				url: `${url}/api/client/data/get`,
				method: "get",
			},
		},
		promocode: {
			verify: {
				url: `${url}/api/client/promocode/verify`,
				method: "post",
			},
		},
		feedback: {
			send: {
				url: `${url}/api/client/feedback/send`,
				method: "post",
			},
		},
	},
	admin: {
		users: {
			change: {
				integers: {
					url: `${url}/api/admin/users/change`,
					apiUrl: `${url}/api/admin/users/change/:field/:email/:value`,
					method: "patch",
				},
				role: {
					apiUrl: `${url}/api/admin/users/change/role/:email/:value`,
					url: `${url}/api/admin/users/change/role`,
					method: "patch",
				},
				products: {
					apiUrl: `${url}/api/admin/users/change/:field/:email/:method/:value`,
					url: `${url}/api/admin/users/change`,
					method: "patch",
				},
			},
			get: {
				all: {
					url: `${url}/api/admin/users/get/all`,
					method: "get",
				},
				single: {
					apiUrl: `${url}/api/admin/users/get/single/:email`,
					url: `${url}/api/admin/users/get/single`,
					method: "get",
				},
			},
			add: {
				url: `${url}/api/admin/users/add`,
				method: "put",
			},
			delete: {
				apiUrl: `${url}/api/admin/users/delete/:email`,
				url: `${url}/api/admin/users/delete`,
				method: "delete",
			},
		},
		promocode: {
			get: {
				url: `${url}/api/admin/promocodes/get`,
				method: "get",
			},
			add: {
				url: `${url}/api/admin/promocodes/add`,
				method: "put",
			},
			delete: {
				apiUrl: `${url}/api/admin/promocodes/delete/:promo`,
				url: `${url}/api/admin/promocodes/delete`,
				method: "delete",
			},
		},
		feedback: {
			read: {
				single: {
					apiUrl: `${url}/api/admin/feedback/read/single/:id`,
					url: `${url}/api/admin/feedback/read/single`,
					method: "patch",
				},
				all: {
					url: `${url}/api/admin/feedback/read/all`,
					method: "patch",
				},
			},
			get: {
				unread: {
					url: `${url}/api/admin/feedback/get/unread`,
					method: "get",
				},
			},
		},
		products: {
			get: {
				url: `${url}/api/admin/products/get`,
				method: "get",
			},
			add: {
				apiUrl: `${url}/api/admin/products/add/:type/:name`,
				url: `${url}/api/admin/products/add`,
				method: "put",
			},
			delete: {
				apiUrl: `${url}/api/admin/products/delete/:type/:name`,
				url: `${url}/api/admin/products/delete`,
				method: "delete",
			},
		},
	},
};
