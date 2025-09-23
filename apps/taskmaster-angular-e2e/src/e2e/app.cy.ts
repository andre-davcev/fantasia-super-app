import { getTitle } from '../support/app.po';

describe('taskmaster-angular-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    // Function helper example, see `../support/app.po.ts` file
    getTitle().contains(/Taskmaster/);
  });
});
