it("Cabinet Component Activities", (): void => {
	cy.before_each();
	cy.get(".nav__btn").click();
	cy.route_check("login");
	cy.get(".cabinet__form_decor").should("be.visible");
	cy.get("form#cabinet_login_form").should("be.visible");
	//goto register
	cy.get(".cabinet__goto_link").click();
	cy.wait(3000);
	cy.route_check("register");
	cy.get("form#cabinet_reg_form").should("be.visible");
	cy.get(".cabinet__form_decor").should("be.visible");
	cy.get(".btn.return").find(".btn__text").contains("Back to login").click();
	cy.wait(3000);
	//back to log in
	cy.route_check("login");
	cy.get(".cabinet__form_input>input[type='email']").type("lavr.marudenko@gmail.com");
	cy.get(".cabinet__form_input>input[type='password']").type("123456");
	cy.get(".cabinet-login .cabinet__form_btn").click();
	cy.wait(3000);
	cy.get(".alert__text").contains("You've logged in successfully.");
	cy.get(".alert").click();
	//cabinet dashboard
	cy.get(".amounts").should("be.visible");
	cy.get(".products").should("be.visible");
	cy.get(".btn.return").find(".btn__text").contains("Logout").click();
	cy.wait(3000);
	cy.get(".alert__text").contains("You've logout successfully.");
	//close cabinet
	cy.get(".btn.close").find(".btn__text").contains("Close").click();
	cy.wait(3000);
	cy.get(".cabinet").should("be.not.visible");
});
