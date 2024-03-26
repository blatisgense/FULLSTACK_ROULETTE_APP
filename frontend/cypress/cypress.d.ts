/// <reference types="cypress" />

declare namespace Cypress {
	export type cy_routes = "" | "login" | "register" | "admin";
	interface Chainable {
		login(): Chainable<void>;
		before_each(): Chainable<void>;
		admin_before_each(): Chainable<void>;
		goto(route: cy_routes): Chainable<void>;
		route_check(route: cy_routes): Chainable<void>;
	}
}
