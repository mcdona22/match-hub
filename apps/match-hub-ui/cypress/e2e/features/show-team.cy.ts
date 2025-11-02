describe('Show single team', () => {
  const teamId = 'xyz';
  beforeEach(() => {
    cy.visit(`/teams/${teamId}`);
  });
  it('should display the main elements of the view', () => {
    cy.get('.page-title').should('contain', 'Team Summary');
  });
});
