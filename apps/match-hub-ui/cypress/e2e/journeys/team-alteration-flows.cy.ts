describe('Teams form should present correctly', () => {
  it('should correctly render for a new team', () => {
    cy.visit('/teams/new');
    cy.get('.data-new-team').should('be.visible');
    cy.get('.page-title').should('contain', 'Add Team');
    const expectedFields = ['name', 'postcode'];
    expectedFields.forEach((field) => {
      const className = `.data-input-${field}`;
      cy.get(`.form > ${className}`).should('be.visible');
    });
  });
});

describe('TeamAlterationFlows', () => {
  it('should successfully add a team');
  it('should not add a team unless valid input');
  it('should not add a team add unless button pressed');
});
