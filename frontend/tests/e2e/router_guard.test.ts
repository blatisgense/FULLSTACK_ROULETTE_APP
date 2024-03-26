describe("Router Guard Tests", (): void => {
	beforeEach(() => cy.before_each());
	describe("Should get success", (): void => {
		it("Goto Admin Panel", (): void => {
			cy.login();
			cy.get(".btn.close").click();
			cy.goto("admin");
			cy.route_check("admin");
		});
		it("Token Exists On Reload Admin", (): void => {
			cy.login();
			cy.get(".btn.close").click();
			cy.goto("admin");
			cy.route_check("admin");
			cy.reload();
			cy.wait(3000);
			cy.route_check("admin");
		});
	});
	describe("Should get errors", (): void => {
		it("Close Modal Before Transition", (): void => {
			cy.login();
			cy.goto("admin");
			cy.get(".alert__text").contains("Close modal before transition");
		});
		it("Authorize Before Entry Admin Panel", (): void => {
			cy.goto("admin");
			cy.wait(3000);
			cy.route_check("login");
		});
		it("Authorize Before Entry Main Dashboard", (): void => {
			cy.goto("");
			cy.wait(3000);
			cy.route_check("login");
		});
		it("Logout Before Entry Main Login", (): void => {
			cy.login();
			cy.get(".alert").click();
			cy.goto("login");
			cy.wait(3000);
			cy.get(".alert__text").contains("Logout before entry login");
			cy.get(".btn.return").click();
			cy.wait(3000);
			cy.route_check("login");
		});
		it("Logout Before Entry Main Register", (): void => {
			cy.login();
			cy.get(".alert").click();
			cy.goto("register");
			cy.wait(3000);
			cy.route_check("");
			cy.get(".alert__text").contains("Logout before entry registration");
			cy.get(".btn.return").click();
			cy.wait(3000);
			cy.goto("register");
			cy.wait(3000);
			cy.route_check("register");
		});
		it("Token Expires On Reload DashBoard", (): void => {
			cy.login();
			cy.route_check("");
			cy.clearAllCookies();
			cy.reload();
			cy.wait(3000);
			cy.route_check("login");
		});
		it("Token Expires On Reload Admin", (): void => {
			cy.login();
			cy.get(".btn.close").click();
			cy.goto("admin");
			cy.route_check("admin");
			cy.clearAllCookies();
			cy.reload();
			cy.wait(3000);
			cy.route_check("login");
		});
	});
});
