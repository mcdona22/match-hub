import { data } from '../../../src/app/features/teams/data/teams-repository-stub';

describe('Teams Front Page Interaction', () => {
  const expectedTeams = data;
  beforeEach(() => {
    cy.visit('/teams');
  });

  it('should display initial view correctly', () => {
    cy.get('.data-teams-page').should('be.visible');
    cy.get('.page-title').should('contain', 'Teams');
    cy.log('This is great so far');
    cy.get('.spinner').should('be.visible');
  });

  it('should show the canned list of teams eventually', () => {
    cy.get('.data-teams-list').should('be.visible');
  });

  it('should display all the teams', () => {
    const expectedTeams: string[] = data.map((team) => team.name);

    cy.log('the expected teams', JSON.stringify(expectedTeams));

    const cssClass = '.data-name';
    cy.get(cssClass)
      .should('have.length', expectedTeams.length)
      .each(($el, index, $list) => {
        const teamName = $el.text().trim();
        expect(teamName).to.equal(expectedTeams[index]);
      });
  });
});
