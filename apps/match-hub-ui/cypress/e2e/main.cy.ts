describe('Main App Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page and display the title', () => {
    cy.get('.page-title').should('be.visible').and('contain.text', 'Welcome');
    cy.get('.page-title').should('be.visible').and('contain.text', 'Match Hub');
  });

  it('should find the correct number of clickable menu items', () => {
    cy.get('.menu-items > a').should('have.length', 2);
  });

  describe('Check app scaffold components', () => {
    const items = [
      { class: '.data-link-teams', value: 'Teams' },
      { class: '.data-link-calender', value: 'Calender' },
    ];

    for (const item of items) {
      it(`it should find the "${item.value}" item`, () => {
        cy.log(`data class for ${item.value} is ${item.class}`);
        cy.get(item.class).should('be.visible').and('contain.text', item.value);
      });
    }
  });
});
