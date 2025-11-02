import { data } from '../../../src/app/features/teams/data/teams-repository-stub';

describe('Teams Front Page Interaction', () => {
  const expectedTeams = data;
  beforeEach(() => {
    cy.visit('/teams');
  });

  it('should display initial view correctly', () => {
    cy.get('.data-teams-page').should('be.visible');
    cy.get('.page-title').should('contain', 'Teams');
  });

  it('should show the canned list of teams eventually', () => {
    cy.get('.data-teams-list').should('be.visible');
  });

  // not safe to use canned data in this way
  it.skip('should display all the teams', () => {
    const expectedTeams: string[] = data.map((team) => team.name);

    cy.log('the expected teams', JSON.stringify(expectedTeams));

    const cssClass = '.data-name';
    cy.get(cssClass)
      .should('have.length', expectedTeams.length)
      .each(($el, index, $list) => {
        const teamName = $el.text().trim();
        console.log(`exoecting "${teamName}"  to be ${expectedTeams[0]}"`);
        expect(teamName).to.equal(expectedTeams[index]);
      });
  });
});
