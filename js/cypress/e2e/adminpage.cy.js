describe('Admin oldal tesztelés', () => {

  beforeEach(() => {
    cy.wait(1000);
    cy.visit('http://localhost:8000/html/loginPage.html');
    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('admin123');
    cy.get('.logButton-frame').click( { force: true });
    cy.url().should('eq', 'http://localhost:8000/adminPage');
  });
  it('Ellnelőrzi a CSS fájlokat', () => {
    cy.get('link[rel="stylesheet"]').should('have.length', 8);
    cy.get('link[rel="icon"]').should('have.attr', 'href', '../images/logo-removebg-preview.png');
  });

  it('Ellenőrzi az oldal felépítését', () => {
    cy.get('.admin-page__admin-navbar').should('exist');
    cy.get('.admin-page__loggedinas-layout').should('exist');
    cy.get('.admin-page__logout-layout').should('exist');
    cy.get('.admin-page__adminpage-maindiv').should('exist');
    cy.get('.admin-page__main-changing-div').should('exist');
    cy.get('.admin-page__admin-text-inner').should('contain', 'Admin');
    cy.get('.admin-page__button-category-layout').should('exist');
    cy.get('.recipe-layout').should('exist');
    cy.get('.indicators').should('exist');
    cy.get('#recipesforverify').should('exist');
    cy.get('.ingredients-layout').should('exist');
    cy.get('.ingredients-layout__add-ingredients').should('exist');
    cy.get('.ingredients-layout__manage-ingredients').should('exist');
    cy.get('.users-layout').should('exist');
    cy.get('.users-layout__add-users').should('exist');
    cy.get('.users-layout__manage-users').should('exist');
    cy.get('.admin-layout').should('exist');
    cy.get('.admin-layout__add-admins').should('exist');
    cy.get('.admin-layout__manage-admins').should('exist');
  });

  it('Ellenőrzi a felhasználók kezelése', () => {
    cy.get('.admin-page__users').click( { force: true });
    cy.get('.users-layout').should('exist');
    cy.get('.users-layout__add-users').should('exist');
    cy.get('.users-layout__manage-users').should('exist');
    cy.get('.users-layout__title').eq(0).should('contain', 'Felhasználó felvétele');
    cy.get('#username').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('.users-layout__add-button').should('exist');
    cy.get('.users-layout__nevermind-button').should('exist');
    cy.get('.users-layout__title').eq(1).should('contain', 'Felhasználók kezelése');
    cy.get('#users').should('exist');
  });

  it('Ellenőrzi a recepetek elfogadását', () => {
    cy.get('.admin-page__recipes').click( { force: true });
    cy.get('.ingredients-layout').should('exist');
    cy.get('.ingredients-layout__add-ingredients').should('exist');
    cy.get('.ingredients-layout__manage-ingredients').should('exist');
    cy.get('.ingredients-layout__title').eq(0).should('contain', 'Hozzávaló felvétele');
    cy.get('#ingredient_name').should('exist');
    cy.get('#ingredient_category').should('exist');
    cy.get('.ingredients-layout__add-button').should('exist');
    cy.get('.ingredients-layout__nevermind-button').should('exist');
    cy.get('.ingredients-layout__title').eq(1).should('contain', 'Hozzávalók kezelése');
    cy.get('#ingredients').should('exist');
  });

  it('Ellenőrzi a hozzávalók felvétele', () => {
    cy.get('.admin-page__ingredients').click( { force: true });
    cy.get('.recipe-layout').should('exist');
    cy.get('.indicators').should('exist');
    cy.get('#recipesforverify').should('exist');
    cy.get('.indicators__id').should('contain', 'ID');
    cy.get('.indicators__picture').should('contain', 'Kép');
    cy.get('.indicators__name').should('contain', 'Név');
  });

  it('Ellenőrzi az adminok kezelése', () => {
    cy.get('.admin-page__admins').click( { force: true });
    cy.get('.admin-layout').should('exist');
    cy.get('.admin-layout__add-admins').should('exist');
    cy.get('.admin-layout__manage-admins').should('exist');
    cy.get('.admin-layout__title').eq(0).should('contain', 'Admin felvétele');
    cy.get('#admin_email').should('exist');
    cy.get('.admin-layout__add-button').should('exist');
    cy.get('.admin-layout__nevermind-button').should('exist');
    cy.get('.admin-layout__title').eq(1).should('contain', 'Adminok kezelése');
    cy.get('#admins').should('exist');
  });
})