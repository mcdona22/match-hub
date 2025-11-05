import { faker } from '@faker-js/faker/locale/en_GB';

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
    cy.get('.data-submit').should('be.visible').and('be.disabled');
  });
});

describe('The form should validate as expected', () => {
  const goodPostCode = 'LS1 2FF';
  const goodName = 'Binstead Reserves';

  const invalidEntries = [
    { name: 'Lee', postcode: goodPostCode, test: 'name too short' },
    { name: null, postcode: goodPostCode, test: 'name missing' },
    { name: goodName, postcode: null, test: 'postcode missing' },

    {
      name: goodName,
      postcode: 'LS1 abc',
      test: 'outward post code portion incorrect',
    },
    {
      name: goodName,
      postcode: 'LS 2FS',
      test: 'inward postcode inward portion incorrect',
    },
  ];
  beforeEach(() => {
    cy.visit('/teams/new');
  });
  invalidEntries.forEach((entry) => {
    it(`should validate ${entry.test} correctly`, () => {
      if (entry.name) cy.get('.form > .data-input-name').type(entry.name);
      cy.get('.form > .data-input-name input').focus();

      if (entry.postcode)
        cy.get('.form > .data-input-postcode').type(entry.postcode);
      cy.get('.form > .data-input-postcode input').focus();
      cy.get('.form > .data-input-name input').focus();

      cy.get('mat-error').should('be.visible');
      cy.get('.data-submit').should('be.visible').and('be.disabled');
    });
  });
});

describe('Team Alteration Flows', () => {
  let tileCount: number;
  let name: string;

  beforeEach(() => {
    tileCount = 0;
    name = faker.location.city();

    cy.visit('/teams');
  });

  it('should successfully add a new team', () => {
    cy.get('.data-team-tile').then((tiles) => {
      tileCount = tiles.length;
      cy.log('Tile count: ', tileCount);
    });
    // cy.pause();
    cy.get('.data-team-add').should('be.visible').click();

    // fill out the form

    cy.log('Team Name', name);
    [
      { field: 'name', value: name },
      { field: 'postcode', value: 'LS1 2GC' },
    ].forEach((input) => {
      const css = `.form > .data-input-${input.field}`;
      cy.get(css).type(input.value);
    });
    // cy.pause();

    cy.get('.data-submit').should('be.visible').and('be.enabled').click();
    // cy.get('.data-submit');

    // now we should have navigated to the teams page
    // cy.pause();

    cy.get('.data-teams-page').should('be.visible');
    cy.get('.page-title').should('contain', 'Teams');
    cy.get('.data-team-tile').then((tiles) => {
      expect(tiles.length).to.eq(tileCount + 1);
    });
    cy.get('.data-name')
      // .contains(name)
      .should('be.visible');
  });

  it('should not add a team add unless button pressed');
});
