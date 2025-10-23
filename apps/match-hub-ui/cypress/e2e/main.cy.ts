describe( "Main App Page", () => {
  beforeEach(() => {
    cy.visit('/');
  });


  it('should load the home page and display the title', () => {
    cy.get('.data-main-wrapper')
      .should('be.visible')
      .and('contain.text', 'change');
  });
})
