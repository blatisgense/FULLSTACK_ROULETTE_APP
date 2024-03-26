describe("Admin Component Activities", (): void => {
	beforeEach(() => cy.admin_before_each());
	it("Messages", (): void => {
		cy.get(".header__feedback").click();
		cy.wait(1000);
		cy.get(".messages").should("be.visible");
		cy.get(".header__feedback").click();
		cy.wait(1000);
		cy.get(".messages").should("be.not.visible");
	});
	it("Layout", (): void => {
		cy.get(".content").should("be.visible");
		cy.get(".header").should("be.visible");
		cy.get(".aside").should("be.visible");
	});
	it("Mobile Layout", (): void => {
		cy.viewport(420, 960);
		cy.get(".aside").should("be.visible");
		cy.get(".header__feedback").click();
		cy.wait(1000);
		cy.get(".messages").should("be.visible");
		cy.get(".header__feedback").click();
		cy.wait(1000);
		cy.get(".messages").should("be.not.visible");
		cy.get(".header__open").click();
		cy.wait(2000);
		cy.get(".aside").should("be.not.visible");
		cy.get(".content").should("be.visible");
	});
});
