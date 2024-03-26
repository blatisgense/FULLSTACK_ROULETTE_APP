describe("Main Component Activities", (): void => {
	beforeEach(() => {
		cy.before_each();
		cy.login();
		cy.get(".btn.close").click();
	});
	it("Wheel Hint", (): void => {
		cy.get(".wheel__hint").should("be.visible");
		cy.get(".wheel__hint").click();
		cy.get(".wheel__hint").should("not.be.visible");
	});
	it("Feedback Modal", (): void => {
		cy.get(".footer__cards").find(" .card:nth-child(2)").find(" .card__text>a").click();
		cy.get(".feedback__container").should("be.visible");
		cy.get(".feedback input").type("lavrik");
		cy.get(".feedback textarea").type("message");
		cy.get(".feedback button").click();
		cy.get(".alert__text").contains("sent");
		cy.get(".feedback__container").should("be.not.visible");
	});
	it("Spin Wheel", (): void => {
		cy.get(".alert").click();
		cy.get(".wheel__center").click();
		cy.wait(8000);
		cy.get(".alert").find("img").should("have.attr", "src").should("include", "success");
	});
});
