import { contactPage } from "../../../pages/herokuapp/steps/contactPage";
import { CONTACT_PAGE_ENDPOINT } from "../../../pages/herokuapp/endPoints/contactPage";
import { form } from "../../../pages/herokuapp/elements/contactPage";
import { FORM } from "../../../support/constants/contactPage";

const longText =
  "dasfadffgfkgnjbfpeqkfpkwewo,f0322i02i0kdlsmfkdmsfjnrn3020i023=3=230kfodfsofmosdmfjd9jfsifdskmfdsmfldmslfldsfdfos0df9ewi-03lmefldsfdf;s]df=dpfwlspfpsdfsfsdfdsfosj1";

describe("Contact page form", () => {
  beforeEach(() => {
    cy.intercept(CONTACT_PAGE_ENDPOINT.feedbacks.endpoint).as(
      CONTACT_PAGE_ENDPOINT.feedbacks.alias
    );
    contactPage.setDefualtCookie();
    cy.visit(CONTACT_PAGE_ENDPOINT.contact.endpoint);
  });

  it.skip("Send feedbacks - happy path", () => {
    //TODO: remove this to commands
    const captchaText = Cypress.$(form.captcha.self).text();
    const form_obj = contactPage.fillFormData("I'm love your services", 4);
    contactPage.verifyRequestDone(
      CONTACT_PAGE_ENDPOINT.feedbacks.alias,
      form_obj
    );
    contactPage.verifyEmptyForm(captchaText);
  });

  it.skip("Send feedbacks with special characters", () => {
    const form_obj = contactPage.fillFormData(
      "return 0; !@#$%^^&**()_+}eval(22/0)",
      2
    );
    contactPage.verifyRequestDone(
      CONTACT_PAGE_ENDPOINT.feedbacks.alias,
      form_obj
    );
    contactPage.verifyEmptyForm();
  });

  it.skip("Send feedbacks with Autor input manually changed", () => {
    let userId = "dsijaj93487283u802kfldsm;sdm;394290"
    cy.removeDisableAndAddText(form.author.disableTextField, userId);
    const form_obj = contactPage.fillFormData("I'm love your services", 4, userId = `${FORM.anonymousText}${userId}`);
    contactPage.verifyRequestDone(
      CONTACT_PAGE_ENDPOINT.feedbacks.alias,
      form_obj
    );
    contactPage.verifyEmptyForm();
  });

  it.skip("Send feedbacks with long text", () => {
    const form_obj = contactPage.fillFormData(longText.slice(0, 160), 3);
    contactPage.verifyRequestDone(
      CONTACT_PAGE_ENDPOINT.feedbacks.alias,
      form_obj
    );
    contactPage.verifyEmptyForm();
  });
});
