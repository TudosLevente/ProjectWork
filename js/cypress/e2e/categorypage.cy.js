describe('Kategória oldal tesztelés', () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.visit('http://localhost:8000/html/categoryPage.html');
  });
  describe('Stíluslap betöltési teszt', () => {
    it('Betölti az összes szükséges stíluslapot', () => {
      const stylesheets = [
        '../css/categoryPage_CSS/vars.css',
        '../css/categoryPage_CSS/style.css',
        '../css/categoryPage_CSS/footer.css',
        '../css/categoryPage_CSS/navbar.css',
        '../css/categoryPage_CSS/responsive.css',
        '../css/categoryPage_CSS/loadingscreen.css',
        '../css/categoryPage_CSS/websidecookies.css',
        '../css/categoryPage_CSS/dropdownfoetel.css',
        '../css/categoryPage_CSS/dropdowndesszert.css',
        '../css/categoryPage_CSS/dropdownkategoriak.css',
        '../css/base_responsive.css'
      ];

      stylesheets.forEach((stylesheet) => {
        cy.request(stylesheet).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  describe('Navigációs teszt', () => {
    it('Navigációs elemeket ellenőrzése', () => {
      cy.get('.navbar').should('be.visible');
    });
  });


  describe('Kategória oldal linkek teszt', () => {
    it('Ellenőrzi az összes linket a kategória oldalon', () => {
      cy.get('.recept_kategoria__kategoriak a').each(($link) => {
        const href = $link.attr('href');
        cy.request(href).then((response) => {
          expect(response.status).to.be.oneOf([200, 201, 204]);
        });
      });
    });

    it('Ellenőrzi, hogy a linkeknek van-e HREF attribútuma', () => {
      cy.get('.recept_kategoria__kategoriak a').each(($link) => {
        const href = $link.attr('href');
        expect(href).to.exist;
      });
    });
  });

  describe('Lábléc teszt', () => {
    it('Checks footer elements', () => {
      cy.get('.footer_foodhub').should('exist').click({ force: true });
      cy.get('.footer_termsofuse').should('exist').click({ force: true });
      cy.get('.footer_email').should('exist').contains('foodhub@gmail.com');
      cy.get('.footer_facebook').should('exist').parent().should('have.attr', 'href', 'https://www.facebook.com/profile.php?id=61558057840547');
      cy.get('.footer_twitter').should('exist').parent().should('have.attr', 'href', 'https://twitter.com/FoodHub_HU');
      cy.get('.footer_intagram').should('exist').parent().should('have.attr', 'href', 'https://www.instagram.com/foodhub_hu/');
    });
  });

  describe('Szkriptbe történő beillesztési teszt', () => {
    it('Checks script inclusion', () => {
      cy.window().should('have.property', '$');
      cy.window().should('have.property', 'Popper');
      cy.window().should('have.property', 'bootstrap');
      const customScripts = [
        '../js/categoryPage_JS/hamburgMenu.js',
        '../js/categoryPage_JS/loadingscreen.js',
        '../js/categoryPage_JS/navbar.js',
        '../js/categoryPage_JS/searchbar.js',
        '../js/categoryPage_JS/foetelekDropdown.js',
        '../js/categoryPage_JS/desszertekDropdown.js',
        '../js/categoryPage_JS/kategoriakDropdown.js',
        '../js/categoryPage_JS/categoryPage_CategoryIDSender.js',
        '../js/categoryPage_JS/CategoryIDSenderNavbar.js',
        '../js/categoryPage_JS/isUserLoggedIn.js',
        '../js/script.js'
      ];

      customScripts.forEach((script) => {
        cy.request(script).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
})