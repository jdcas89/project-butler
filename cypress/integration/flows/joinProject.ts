import { setCurrentUser } from '../../support/commands';
import * as faker from 'faker';

context('Projects', () => {
  const TEST_PROJECT_ADMIN = '1';
  const TEST_PROJECT_MEMBER = '2';

  beforeEach(() => {
    setCurrentUser(TEST_PROJECT_ADMIN);
  });

  it('as a project admin I should be able to successfully invite other users to my project', () => {
    const PROJECT_NAME = faker.company.bsBuzz() + faker.company.bs() + faker.commerce.product();
    cy.visit('/');
    cy.findByTestId('actions-create-project').click();
    cy.findByTestId('field-project-name').type(PROJECT_NAME);
    cy.findByTestId('actions-confirm-create-project').click();
    cy.findByText(PROJECT_NAME).click();
    cy.findByTestId('invitation-link')
      .invoke('text')
      .then((text) => {
        const shareLink = String(text);
        setCurrentUser(TEST_PROJECT_MEMBER);
        cy.visit(shareLink);
        cy.findByTestId('actions-join-project').click();
        cy.findByTestId('project-title').should('have.text', `Project: ${PROJECT_NAME}`);
      });
  });
});
