import cy_routes = Cypress.cy_routes;
Cypress.Commands.add("login", () => {
	cy.get(".nav__btn").click();
	cy.get(".cabinet__form_input>input[type='email']").type("lavr.marudenko@gmail.com");
	cy.get(".cabinet__form_input>input[type='password']").type("123456");
	cy.get(".cabinet-login .cabinet__form_btn").click();
});

Cypress.Commands.add("before_each", () => {
	cy.clearAllCookies();
	cy.goto("login");
});

Cypress.Commands.add("admin_before_each", () => {
	cy.goto("login");
	cy.login();
	cy.wait(3000);
	cy.get(".btn.close").click();
	cy.goto("admin");
	cy.wait(3000);
	cy.route_check("admin");
	cy.get(".alert").click();
});

let base_url: string = "http://localhost:5173";
Cypress.Commands.add("goto", (route: cy_routes) => {
	cy.visit(`${base_url}/#/${route}`);
});

Cypress.Commands.add("route_check", (route: cy_routes) => {
	cy.url().should("eq", `${base_url}/#/${route}`);
});
