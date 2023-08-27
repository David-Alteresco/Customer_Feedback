import { form } from "../elements/contactPage";
import { COOKIES, FORM } from "../../../support/constants/contactPage";
import { DIRECTIONS, METHOD } from "../../../support/constants/global";

const contactPage = {
  setDefualtCookie: () => {
    cy.setCookie(COOKIES.welcomeBanner, COOKIES.statusDismiss);
    cy.setCookie(COOKIES.cookieconsent, COOKIES.statusDismiss);
    cy.setCookie(COOKIES.language, Cypress.env("language"));
  },

  calculateCaptchaMath: () => {
    // get math calculation string from captcha and calculate it
    const captchText = Cypress.$(form.captcha.self).text();
    return eval(captchText).toString();
  },

  fillFormData: (commentText, ratingNum) => {
    cy.get(form.comment.input).type(commentText);
    cy.moveValueSlider(form.rating.self, ratingNum, DIRECTIONS.right);
    const captchaSum = contactPage.calculateCaptchaMath();
    cy.get(form.captcha.input).type(captchaSum);
    cy.get(form.submit.self).click();
    return {
      captcha: captchaSum,
      comment: `${commentText} (anonymous)`,
      rating: ratingNum,
    };
  },

  verifyEmptyForm: (captchText) => {
    cy.get(form.author.inputType)
      .first()
      .should("have.value", FORM.anonymousText);
    cy.get(form.comment.input).should("have.text", "");
    cy.get(form.rating).invoke("attr", "aria-valuenow").should("eq", "0");
    cy.get(form.captcha.self).should("not.have.text", captchText);
    cy.get(form.captcha.input).should("have.text", "");
    cy.get(form.submit.self).should("be.disabled");
  },

  verifyRequestDone: (alias, obj) => {
    cy.wait(`@${alias}`).then(({ request, response }) => {
      expect(request.method).to.equal(METHOD.post);
      expect(request.body).to.deep.include(obj);
      expect(response.statusCode).to.equal(201);
    });
  },
};

export { contactPage };
