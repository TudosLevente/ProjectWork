describe('Error oldal tesztelés', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/errorPage.html');
  });
  it('Ellenőrzi a navigációs szakasz betöltését', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Meglátogatja a hibaoldalt és ellenőrzi az elemeket', () => {
    cy.get('.error-page__errorimage-1').should('be.visible');
    cy.get('.error-page__error-title').should('have.text', 'Oops! Valami rosszul sült el...');
    cy.get('.error-page__error-description').should('be.visible');
    cy.get('.error-description-span').should('contain', 'Úgy tűnik, hogy eltévedtél valahogy.');
    cy.get('.error-description-span2').within(() => {
      cy.get('li').should('have.length', 3);
      cy.contains('li', 'Ellenőrizd az URL-t').should('be.visible');
      cy.contains('li', 'Térj vissza a kezdőlapra').should('be.visible');
      cy.contains('li', 'Használd a keresőt').should('be.visible');
    });
    cy.get('.error-description-span3').should('be.visible');
  });

  it('Navigates to the homepage from the error page', () => {
    cy.get('.error-description-span2').contains('IDE').click({ force: true });
    cy.url().should('eq', 'http://localhost:8000/');
  });

  it('CSS fájlok betöltése', () => {
    cy.get('head link[rel="icon"]').should('have.attr', 'href', '../images/logo-removebg-preview.png');
    cy.get('head link[rel="stylesheet"]').should('have.length', 11);
    cy.get('head link[rel="stylesheet"][href*="vars.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="style.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="navbar.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="footer.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdowndesszert.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdownkategoriak.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdownfoetel.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="scrollbar.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="responsive.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="base_responsive.css"]').should('exist');
    cy.get('head link[href*="bootstrap.min.css"]').should('exist');
  });

  it('JS fájlok betöltése', () => {
    cy.request('../js/errorPage_JS/desszertekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/errorPage_JS/foetelekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/errorPage_JS/kategoriakDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/errorPage_JS/hamburgMenu.js').should('have.property', 'status', 200);
    cy.request('../js/errorPage_JS/navbar.js').should('have.property', 'status', 200);
    cy.request('../js/errorPage_JS/isUserLoggedIn.js').should('have.property', 'status', 200);
    cy.request('../js/errorPage_JS/CategoryIDSenderNavbar.js').should('have.property', 'status', 200);
    cy.request('../js/script.js').should('have.property', 'status', 200);
  });
});