import {createRouter, createWebHashHistory, RouteLocationNormalized, Router} from "vue-router";
import {useUiStore} from "@state/pinia.ts";
import {routes} from "@router/routes.ts"

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized): boolean => {
    if (useUiStore().modal_bg && from.matched[0] && (from.matched[0] != to.matched[0])) {
        useUiStore().set_alert("Close modal before transition", "error")
        return false;
    }
    return Boolean(to.meta.name && to.meta.component);
})