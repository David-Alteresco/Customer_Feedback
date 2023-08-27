// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-network-idle";
import { DIRECTIONS , PROPS } from "./constants/global";

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  originalFn(url, options);
  cy.waitForNetworkIdle(5000);
});

Cypress.Commands.add("removeDisableAndAddText", (selector, text) => {
  Cypress.$(selector).prop(PROPS.disabled,false);
  cy.get(selector).type(text);
});


// drag and drop of slider by values
Cypress.Commands.add("moveValueSlider", (selector, targetValue, dirction) => {
  const valueMax = Cypress.$(selector).attr("aria-valuemax");
  const valueMin = Cypress.$(selector).attr("aria-valuemin");
  const ticksValue = Cypress.$(selector).attr("tickinterval");
  let currentValue = Cypress.$(selector).attr("aria-valuenow");

  if (currentValue < valueMin) {
    currentValue = valueMin;
  }
  if (currentValue > valueMax) {
    currentValue = valueMax;
  }

  const ticks = Math.abs(targetValue - currentValue) / ticksValue;
  let i = 0;
  cy.get(`${selector} ${".mat-slider-thumb"}`).click({ force: true });
  while (ticks > i) {
    switch (dirction) {
      case DIRECTIONS.up:
        cy.get(selector).type("{upArrow}", { force: true });
        break;
      case DIRECTIONS.down:
        cy.get(selector).type("{downArrow}", { force: true });
        break;
      case DIRECTIONS.right:
        cy.get(selector).type("{rightArrow}", { force: true });
        break;
      case DIRECTIONS.left:
        cy.get(selector).type("{leftArrow}", { force: true });
        break;
    }
    i++;
  }
});
