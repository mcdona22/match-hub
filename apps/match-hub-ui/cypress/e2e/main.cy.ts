describe('Main App Page', () => {
  const expectedMenuItems = 2;

  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page and display the title', () => {
    cy.get('.page-title').should('be.visible').and('contain.text', 'Welcome');
    cy.get('.page-title').should('be.visible').and('contain.text', 'Match Hub');
  });

  it('should find the correct number of clickable menu items', () => {
    cy.get('.menu-items > a').should('have.length', expectedMenuItems);
  });

  describe('Check app scaffold components', () => {
    const items = [{ class: '.data-link-teams', value: 'Teams' }];

    for (const item of items) {
      it(`it should find the "${item.value}" item`, () => {
        cy.log(`data class for ${item.value} is ${item.class}`);
        cy.get(item.class).should('be.visible').and('contain.text', item.value);
      });
    }
  });

  describe('responsive tests', () => {
    const VIEW_PORT_HEIGHT = 900;
    const BREAKPOINT_MOBILE_MAX = 767;
    const BREAKPOINT_DESKTOP_MIN = 768;
    beforeEach(() => {
      cy.viewport(BREAKPOINT_MOBILE_MAX, VIEW_PORT_HEIGHT);
    });

    it('should show the menu icon and hide nav links in narrow screens', () => {
      cy.get('.menu-items > a').should('not.be.visible');
      cy.get('.menu-items > button[mat-icon-button]').should('be.visible');
    });

    it('should show the menu options when the menu button is clicked', () => {
      const menuButton = cy.get('.data-menu-toggle');
      menuButton.should('be.visible');
      menuButton.click();
      cy.get('.menu-options').should('be.visible');
      cy.get('.menu-options > .menu-option').then((options) => {
        expect(options.length).to.equal(expectedMenuItems);
      });
    });

    describe('Correct navigation from side menu options', () => {
      const buttons = [
        { name: 'home', expectedUrl: '/' },
        { name: 'teams', expectedUrl: '/teams' },
      ];

      beforeEach(() => {
        const menuButton = cy.get('.data-menu-toggle');
        menuButton.click();
      });

      buttons.forEach((button) => {
        it(`should navigate to ${button.name} page`, () => {
          const buttonClass = `.data-button-${button.name}`;
          const menuButton = cy.get(buttonClass);
          menuButton.click();
          cy.url().should((url) => {
            expect(
              url.endsWith(button.expectedUrl),
              `"${url}" should end with "${button.expectedUrl}"`,
            ).to.be.true;
          });
        });
      });
    });

    it('should hide the menu icon and hide nav links in larger  screens', () => {
      cy.viewport(BREAKPOINT_DESKTOP_MIN, VIEW_PORT_HEIGHT);
      cy.get('.menu-items > a').should('be.visible');
      cy.get('.menu-items > button[mat-icon-button]').should('not.be.visible');
    });
  });
});
