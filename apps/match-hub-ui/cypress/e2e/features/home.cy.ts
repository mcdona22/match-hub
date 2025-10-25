describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show some principal components', () => {
    cy.get('.page-title').should('be.visible').and('contain.text', 'Match Hub');
  });
});
