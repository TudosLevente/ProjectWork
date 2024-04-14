describe('Profil oldal tesztelés', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/html/profilePage.html');
    cy.wait(1000);
  });
  it('JS fájlok betöltése', () => {
    cy.request('../js/profilePage_JS/menubuttons.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/hamburgMenu.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/loadingscreen.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/searchbar.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/CategoryIDSenderNavbar.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/desszertekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/foetelekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/kategoriakDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/navbar.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/loadUserData.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/profilemodifying.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/favoritesAndmyrecipes.js').should('have.property', 'status', 200);
    cy.request('../js/script.js').should('have.property', 'status', 200);
    cy.request('../js/logout.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/isUserLoggedIn.js').should('have.property', 'status', 200);
    cy.request('../js/profilePage_JS/CategoryIDSenderNavbar.js').should('have.property', 'status', 200);
  });

  it('CSS fájlok betöltése', () => {
    cy.get('head link[rel="stylesheet"]').should('have.length', 15);
    cy.get('head link[rel="stylesheet"][href*="style.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdownfoetel.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdowndesszert.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdownkategoriak.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="dropdownprofil.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="loadingscreen.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="footer.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="navbar.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="scrollbar.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="websidecookies.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="responsive.css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href*="base_responsive.css"]').should('exist');
  });

  it('Navigációs elemeket ellenőrzése', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Oldal megjelenítése', () => {
    cy.get('.div_body.container-fluid').should('exist');
    cy.get('.profil_text').should('have.text', ' Profil ');
    cy.get('.menu_div').should('exist');
    cy.get('#DataDivButton').should('exist');
    cy.get('#RecipesDivButton').should('exist');
    cy.get('#FavoritesDivButton').should('exist');
    cy.get('.main_div').should('exist');
    cy.get('#my_data_div').should('be.visible');
    cy.get('#my_recipes_div').should('not.be.visible');
    cy.get('#my_favorites_div').should('not.be.visible');
    cy.get('#RecipesDivButton').click();
    cy.get('#my_data_div').should('not.be.visible');
    cy.get('#my_recipes_div').should('be.visible');
    cy.get('#my_favorites_div').should('not.be.visible');
    cy.get('#FavoritesDivButton').click();
    cy.get('#my_data_div').should('not.be.visible');
    cy.get('#my_recipes_div').should('not.be.visible');
    cy.get('#my_favorites_div').should('be.visible');
  });
})