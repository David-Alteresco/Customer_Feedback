import { contactPage } from "../../../pages/herokuapp/steps/contactPage";
import { CONTACT_PAGE_ENDPOINT } from "../../../pages/herokuapp/endPoints/contactPage";
import captchaData from '../../../fixtures/Page/contactPage/mockCaptcha.json'

describe("Contact page form", () => {
  beforeEach(() => {
    cy.intercept(CONTACT_PAGE_ENDPOINT.captcha.endpoint, (req) => {
      req.continue((res) => {
        res.send(captchaData);
      });
    }).as(CONTACT_PAGE_ENDPOINT.captcha.alias);
    contactPage.setDefualtCookie();
    cy.visit(CONTACT_PAGE_ENDPOINT.contact.endpoint);
  });

  it("Send feedbacks - happy path", () => {
    cy.wait(`@${CONTACT_PAGE_ENDPOINT.captcha.alias}`).then(($res) => {
      const body = $res.response.body;
      cy.log(body);
    });
  });
});
