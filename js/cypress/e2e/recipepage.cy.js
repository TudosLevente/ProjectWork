describe('Recept oldal tesztelés', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/html/recipePage.html')
  })

  it('CSS fájlok betöltése', () => {
    cy.get('head link[href*="vars.css"]').should('exist');
    cy.get('head link[href*="style.css"]').should('exist');
    cy.get('head link[href*="loadingscreen.css"]').should('exist');
    cy.get('head link[href*="footer.css"]').should('exist');
    cy.get('head link[href*="navbar.css"]').should('exist');
    cy.get('head link[href*="responsive.css"]').should('exist');
    cy.get('head link[href*="dropdowndesszert.css"]').should('exist');
    cy.get('head link[href*="dropdownfoetel.css"]').should('exist');
    cy.get('head link[href*="dropdownkategoriak.css"]').should('exist');
    cy.get('head link[href*="scrollbar.css"]').should('exist');
    cy.get('head link[href*="base_responsive.css"]').should('exist');
  });

  it('Js fájlok betöltése', () => {
    cy.request('../js/recipePage_JS/loadingscreen.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/hamburgMenu.js').should('have.property', 'status', 200);
    cy.request('../../js/script.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/commentsInput.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/loadRecipe.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/searchbar.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/desszertekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/foetelekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/kategoriakDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/navbar.js').should('have.property', 'status', 200);
    cy.request('../js/recipePage_JS/CategoryIDSenderNavbar.js').should('have.property', 'status', 200);
  });

  it('Navigációs elemeket ellenőrzése', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('A recept részleteit és megjegyzéseit helyesen meg jelenítése', () => {
    cy.get('.recipe-title-text').should('have.text', 'Egy példa kaja');
    cy.get('.recipe-description-text').should('contain.text', 'Egy rövid leírás az ételről');
    cy.get('.recipe-img-display').should('have.attr', 'src').should('include', 'food 1.png');
    cy.get('.recipe-details-data-username').should('contain.text', 'Feltöltötte:');
    cy.get('.recipe-details-data-date').should('contain.text', 'Feltöltve:');
    cy.get('.recipe-details-favoritebutton').should('exist');
    cy.get('.recipe-details-cooking-service-number').should('have.text', '2');
    cy.get('.recipe-comments-title-text').should('have.text', 'Hozzászólások');
    cy.get('.recipe-comments-input').should('exist');
  });
})