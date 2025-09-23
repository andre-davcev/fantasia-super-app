import { getTitle } from '../support/app.po';

describe('fantasia-angular-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    getTitle().contains(/Andre Davcev/);
  });
});
