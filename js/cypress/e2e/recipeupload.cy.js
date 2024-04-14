
describe('Recept feltöltése', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/html/recipeUpload.html')
  })

  it('CSS fájlok betöltése', () => {
    cy.get('head link[href*="vars.css"]').should('exist');
    cy.get('head link[href*="style.css"]').should('exist');
    cy.get('head link[href*="navbar.css"]').should('exist');
    cy.get('head link[href*="footer.css"]').should('exist');
    cy.get('head link[href*="dropdowndesszert.css"]').should('exist');
    cy.get('head link[href*="dropdownfoetel.css"]').should('exist');
    cy.get('head link[href*="dropdownkategoriak.css"]').should('exist');
    cy.get('head link[href*="responsive.css"]').should('exist');
    cy.get('head link[href*="scrollbar.css"]').should('exist');
    cy.get('head link[href*="base_responsive.css"]').should('exist');
    cy.get('head link[href*="bootstrap.min.css"]').should('exist');
  });

  it('Js fájlok betöltése', () => {
    cy.request('../js/recipeUpload_JS/navbar.js').should('have.property', 'status', 200);
    cy.request('../js/recipeUpload_JS/hamburgMenu.js').should('have.property', 'status', 200);
    cy.request('../js/recipeUpload_JS/searchbar.js').should('have.property', 'status', 200);
    cy.request('../js/recipeUpload_JS/foetelekDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipeUpload_JS/kategoriakDropdown.js').should('have.property', 'status', 200);
    cy.request('../js/recipeUpload_JS/isUserLoggedIn.js').should('have.property', 'status', 200);
    cy.request('../js/recipeUpload_JS/CategoryIDSenderNavbar.js').should('have.property', 'status', 200);
    cy.request('../js/script.js').should('have.property', 'status', 200);
  });

  it('Navigációs elemeket ellenőrzése', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Oldal megjelenítése', () => {
    cy.get('#title').should('exist');
    cy.get('#description').should('exist');
    cy.get('#picture_data').should('exist');
    cy.get('#uploadForm').should('exist');
    cy.get('.ingredient_name input').should('have.length.greaterThan', 0);
    cy.get('.ingredient_amount input').should('have.length.greaterThan', 0);
    cy.get('.ingredient_measurement input').should('have.length.greaterThan', 0);
    cy.get('.instruction_input').should('have.length.greaterThan', 0);
    cy.get('.preparation_div_row').should('have.length.greaterThan', 0);
    cy.get('.serving_size_number').should('exist');
    cy.get('#difficulty').should('exist');
    cy.get('#food_category').should('exist');
    cy.get('button[type="button"]').should('exist');
  });
});