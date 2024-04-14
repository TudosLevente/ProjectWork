describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/loginPage.html')
  });

  it('Bejelentkezési űrlapot jelenít meg', () => {
    cy.get('#bejelentkezes').should('exist');
  });

  it('Megjeleníti az email bemenetet', () => {
    cy.get('#email').should('exist').should('have.attr', 'type', 'email');
  });

  it('Megjeleníti a jelszó bevitelét', () => {
    cy.get('#password').should('exist').should('have.attr', 'type', 'password');
  });

  it('Megjeleníti a Jelszó megjelenítése gombot', () => {
    cy.get('.gomb-style').should('exist').should('contain.text', 'Mutasd');
  });

  it('Jelszó láthatóságának tesztelése', () => {
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('.gomb-style').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.gomb-style').click();
    cy.get('#password').should('have.attr', 'type', 'password');
  });

  it('Van regisztrációs link', () => {
    cy.get('.logTOregText-span-a a').should('exist').should('have.attr', 'href', '../html/registrationPage.html');
  });

  it('Navigálás a regisztrációs oldalra', () => {
    cy.get('.logTOregText-span-a a').click();
    cy.url().should('eq', 'http://localhost:8000/html/registrationPage.html');
  });

  it(' Új felhasználó regisztrálásés bejelentkezés', () => {
    const newuseremail = 'newuser@example.com';

    cy.request({
      method: 'DELETE',
      url: '/api/deleteUser',
      body: {
        email: newuseremail
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.get('.logTOregText-span-a > a').click();
    cy.url().should('eq', 'http://localhost:8000/html/registrationPage.html');
    cy.get('#username').type('newuser');
    cy.get('#email').type(newuseremail);
    cy.get('#password').type('newPassword123');
    cy.get('#passwordAgain').type('newPassword123');
    cy.get('.regButton-frame').click();

    cy.url().should('eq', 'http://localhost:8000/html/loginPage.html');
    cy.get('#email').type(newuseremail);
    cy.get('#password').type('newPassword123');
    cy.get('.logButton-frame').click();
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:8000/');

    cy.request({
      method: 'DELETE',
      url: '/api/deleteUser',
      body: {
        email: newuseremail
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Rossz felhasználói bejelentkezés', () => {
    cy.get('#email').type('newuserexample.com');
    cy.get('#password').type('newPassword123');
    cy.get('.logButton-frame').click();
    cy.get('#email').should('have.attr', 'required');
    cy.url().should('eq','http://localhost:8000/html/loginPage.html');
  });
});



describe('Reszponzivitás tesztelés', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/loginPage.html')
  });

  it('320-375px', () => {
    cy.viewport(350, 800);
    cy.get('body').should('have.css', 'padding-right', '0px');
    cy.get('.logo').should('have.css', 'position', 'absolute');
    cy.get('.logo').should('have.css', 'top', '-150px');
    cy.get('.logo').should('have.css', 'background-position', '50% 50%');
    cy.get('.border').should('have.css', 'border', '0px none rgb(0, 0, 0)');
  });

  it('375-425px', () => {
    cy.viewport(400, 800);
    cy.get('body').should('have.css', 'padding-right', '0px');
    cy.get('.logo').should('have.css', 'position', 'absolute');
    cy.get('.logo').should('have.css', 'top', '-150px');
    cy.get('.logo').should('have.css', 'background-position', '50% 50%');
  });

  it('425-721px', () => {
    cy.viewport(600, 800);
    cy.get('body').should('have.css', 'padding-right', '5px');
  });

  it('721-768px', () => {
    cy.viewport(750, 800);
    cy.get('body').should('have.css', 'padding-right', '50px');
  });

  it('768-992px', () => {
    cy.viewport(800, 800);
    cy.get('body').should('have.css', 'padding-right', '100px');
  });

  it('992-1200px', () => {
    cy.viewport(1100, 800);
    cy.get('body').should('have.css', 'padding-right', '100px');
  });

  it('1200px és felette', () => {
    cy.viewport(1300, 800);
    cy.get('body').should('have.css', 'padding-right', '60px');
  });
});
