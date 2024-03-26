import { useUiStore } from "@state/pinia.ts";
import { RouteLocationNormalized } from "vue-router";
import { router } from "@router/router.ts";

export const routes = [
	{
		path: "/",
		component: () => import("@pages/main.vue"),
		meta: { name: "Main", component: true },
		beforeEnter: async (): Promise<void> => {
			document.title = "Magic Wheel";
		},
		children: [
			{
				path: "",
				meta: { name: "Dashboard", component: true },
				component: () => import("@views/cabinet/mainCabinetBoard.vue"),
				beforeEnter: async (): Promise<boolean | undefined> => {
					if (!useUiStore().logged_in) {
						await router.push("/login");
						return false;
					}
				},
			},
			{
				path: "register",
				meta: { name: "Register", component: true },
				component: () => import("@views/cabinet/mainCabinetRegister.vue"),
				beforeEnter: async (): Promise<boolean | undefined> => {
					if (useUiStore().logged_in) {
						useUiStore().set_alert("Logout before entry registration", "error");
						await router.push("/");
						return false;
					}
				},
			},
			{
				path: "login",
				meta: { name: "Login", component: true },
				component: () => import("@views/cabinet/mainCabinetLogin.vue"),
				beforeEnter: async (): Promise<boolean | undefined> => {
					if (useUiStore().logged_in) {
						useUiStore().set_alert("Logout before entry login", "error");
						await router.push("/");
						return false;
					}
				},
			},
		],
	},
	{
		path: "/admin",
		meta: { name: "Admin", component: true },
		component: () => import("@pages/admin.vue"),
		beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<boolean | undefined> => {
			if (from.matched[0] && from.matched[0].name === "Main" && !useUiStore().logged_in) {
				await router.push("/login");
				return false;
			}
			document.title = "Magic Wheel - Admin";
		},
		children: [
			{
				path: "",
				meta: { name: "Default", component: true },
				component: () => import("@views/admin/adminDefault.vue"),
			},
			{
				path: "users",
				meta: { name: "Users", component: false },
				children: [
					{
						path: "change",
						meta: { name: "Change", component: false },
						children: [
							{
								path: "integers",
								meta: { name: "Integers", component: true },
								component: () => import("@views/admin/users/change/adminUserIntegers.vue"),
							},
							{
								path: "role",
								meta: { name: "Role", component: true },
								component: () => import("@views/admin/users/change/adminUserRole.vue"),
							},
							{
								path: "products",
								meta: { name: "Products", component: true },
								component: () => import("@views/admin/users/change/adminUserProducts.vue"),
							},
						],
					},
					{
						path: "get",
						meta: { name: "Get", component: false },
						children: [
							{
								path: "all",
								meta: { name: "All", component: true },
								component: () => import("@views/admin/users/get/adminUserAll.vue"),
							},
							{
								path: "single",
								meta: { name: "Single", component: true },
								component: () => import("@views/admin/users/get/adminUserSingle.vue"),
							},
						],
					},
					{
						meta: { name: "Add", component: true },
						path: "add",
						component: () => import("@views/admin/users/adminUserAdd.vue"),
					},
					{
						meta: { name: "Delete", component: true },
						path: "delete",
						component: () => import("@views/admin/users/adminUserDelete.vue"),
					},
				],
			},
			{
				path: "products",
				meta: { name: "Products", component: false },
				children: [
					{
						path: "add",
						meta: { name: "Add", component: true },
						component: () => import("@views/admin/products/adminProductAdd.vue"),
					},
					{
						path: "delete",
						meta: { name: "Delete", component: true },
						component: () => import("@views/admin/products/adminProductDelete.vue"),
					},
					{
						path: "get",
						meta: { name: "Det", component: true },
						component: () => import("@views/admin/products/adminProductGet.vue"),
					},
				],
			},
			{
				path: "promocodes",
				meta: { name: "Promocodes", component: false },
				children: [
					{
						path: "add",
						meta: { name: "Add", component: true },
						component: () => import("@views/admin/promocodes/adminPromoAdd.vue"),
					},
					{
						path: "delete",
						meta: { name: "Delete", component: true },
						component: () => import("@views/admin/promocodes/adminPromoDelete.vue"),
					},
					{
						path: "get",
						meta: { name: "Get", component: true },
						component: () => import("@views/admin/promocodes/adminPromoGet.vue"),
					},
				],
			},
		],
	},
];
