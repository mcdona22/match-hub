describe('Teams Front Page Interaction', () => {
  beforeEach(() => {
    cy.visit('/teams');
  });

  it('should land correctly', () => {
    cy.get('.data-teams-page').should('be.visible');
    cy.get('.page-title').should('contain', 'Teams');
  });
  it('should show the canned list of teams');
});
