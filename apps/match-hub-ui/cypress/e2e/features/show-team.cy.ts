describe('Show single team', () => {
  const teamId = 'test';
  beforeEach(() => {
    cy.visit(`/teams/${teamId}`);
  });
  it('should display the main elements of the view', () => {
    cy.get('.page-title').should('contain', 'Team Summary');
  });
});
