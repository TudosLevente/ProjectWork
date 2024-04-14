describe('Recept keresés oldal tesztelés', () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.visit('http://127.0.0.1:5500/html/recipesearchPage.html')
  })

  it('CSS fájlok betöltése', () => {
    cy.get('head link[href*="vars.css"]').should('exist');
    cy.get('head link[href*="style.css"]').should('exist');
    cy.get('head link[href*="footer.css"]').should('exist');
    cy.get('head link[href*="navbar.css"]').should('exist');
    cy.get('head link[href*="loadingscreen.css"]').should('exist');
    cy.get('head link[href*="websidecookies.css"]').should('exist');
    cy.get('head link[href*="dropdownfoetel.css"]').should('exist');
    cy.get('head link[href*="dropdowndesszert.css"]').should('exist');
    cy.get('head link[href*="dropdownkategoriak.css"]').should('exist');
    cy.get('head link[href*="responsive.css"]').should('exist');
    cy.get('head link[href*="scrollbar.css"]').should('exist');
    cy.get('head link[href*="base_responsive.css"]').should('exist');
    cy.get('head link[href*="bootstrap.min.css"]').should('exist');
  });

  it('Js fájlok betöltése', () => {
    cy.request('../js/recipesearchPage_JS/loadingscreen.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/navbar.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/hamburgMenu.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/searchbar.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/foetelekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/desszertekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/kategoriakDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/websidesookiesHandle.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/recipesearchPage_CategoryID&NameSetter.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/isUserLoggedIn.js').should('have.property', 'status', 200);
    cy.request('../js/recipesearchPage_JS/CategoryIDSenderNavbar.js').should('have.property', 'status', 200);
  });

  it('Navigációs elemeket ellenőrzése', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Oldal megjelenítése', () => {
    cy.get('.recept_kategoria').should('be.visible');
    cy.get('.recept_kategoria__recept_title').should('contain', 'Kategória Név');
    cy.get('.recept_kategoria__div').should('have.length.greaterThan', 0);
    cy.get('.recept_kategoria__div').each((category) => {
      cy.wrap(category).find('.recept_kategoria__div_image').should('have.attr', 'src').and('not.be.empty');
      cy.wrap(category).find('.recept_kategoria__div_title').should('not.be.empty');
    });
  });

})