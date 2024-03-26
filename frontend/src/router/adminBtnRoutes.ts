export const adminBtnRoutes: Array<{title: string, data: Array<{path: string, text: string}>}> = [
    {
        title: "Users",
        data: [
            {
                path: "/admin/users/change/integers",
                text: "Change User's Integers",
            },
            {
                path: "/admin/users/change/role",
                text: "Change User's Role",
            },
            {
                path: "/admin/users/change/products",
                text: "Change User's Products",
            },
            {
                path: "/admin/users/get/all",
                text: "Get All Users' Data",
            },
            {
                path: "/admin/users/get/single",
                text: "Get Single User's Data",
            },
            {
                path: "/admin/users/add",
                text: "Add User",
            },
            {
                path: "/admin/users/delete",
                text: "Delete User",
            },
        ],
    },
    {
        title: "Products",
        data: [
            {
                path: "/admin/products/add",
                text: "Add Products",
            },
            {
                path: "/admin/products/delete",
                text: "Delete Products",
            },
            {
                path: "/admin/products/get",
                text: "Get All Products",
            },
        ],
    },
    {
        title: "Promocodes",
        data: [
            {
                path: "/admin/promocodes/add",
                text: "Add Promocodes",
            },
            {
                path: "/admin/promocodes/delete",
                text: "Delete Promocodes",
            },
            {
                path: "/admin/promocodes/get",
                text: "Get All Promocodes",
            },
        ],
    }
]
