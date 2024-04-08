describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/loginPage.html')
  });

  it('displays login form', () => {
    cy.get('#bejelentkezes').should('exist');
  });

  it('displays email input', () => {
    cy.get('#email').should('exist').should('have.attr', 'type', 'email');
  });

  it('displays password input', () => {
    cy.get('#password').should('exist').should('have.attr', 'type', 'password');
  });

  it('displays show password button', () => {
    cy.get('.gomb-style').should('exist').should('contain.text', 'Mutasd');
  });

  it('toggles password visibility', () => {
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('.gomb-style').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.gomb-style').click();
    cy.get('#password').should('have.attr', 'type', 'password');
  });

  it('has registration link', () => {
    cy.get('.logTOregText-span-a a').should('exist').should('have.attr', 'href', '../html/registrationPage.html');
  });

  it('navigates to registration page', () => {
    cy.get('.logTOregText-span-a a').click();
    cy.url().should('eq', 'http://localhost:8000/html/registrationPage.html');
  });

  it('reg new user and login', () => {
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

  it('wrong user login', () => {
    cy.get('#email').type('newuserexample.com');
    cy.get('#password').type('newPassword123');
    cy.get('.logButton-frame').click();
    cy.get('#email').should('have.attr', 'required');
    cy.url().should('eq','http://localhost:8000/html/loginPage.html');
  });
});



describe('Responsive Design Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/loginPage.html')
  });

  it('320-375px: Absolute logo, no border', () => {
    cy.viewport(350, 800);
    cy.get('body').should('have.css', 'padding-right', '0px');
    cy.get('.logo').should('have.css', 'position', 'absolute');
    cy.get('.logo').should('have.css', 'top', '-130px');
    cy.get('.logo').should('have.css', 'background-position', '50% 50%');
    cy.get('.border').should('have.css', 'border', '0px none rgb(0, 0, 0)');
  });

  it('375-425px: Absolute logo', () => {
    cy.viewport(400, 800);
    cy.get('body').should('have.css', 'padding-right', '0px');
    cy.get('.logo').should('have.css', 'position', 'absolute');
    cy.get('.logo').should('have.css', 'top', '-130px');
    cy.get('.logo').should('have.css', 'background-position', '50% 50%');
  });

  it('425-721px: Padding-right: 5px', () => {
    cy.viewport(600, 800);
    cy.get('body').should('have.css', 'padding-right', '5px');
  });

  it('721-768px: Padding-right: 50px', () => {
    cy.viewport(750, 800);
    cy.get('body').should('have.css', 'padding-right', '50px');
  });

  it('768-992px: Padding-right: 100px', () => {
    cy.viewport(800, 800);
    cy.get('body').should('have.css', 'padding-right', '100px');
  });

  it('992-1200px: Padding-right: 100px', () => {
    cy.viewport(1100, 800);
    cy.get('body').should('have.css', 'padding-right', '100px');
  });

  it('1200px and above: Padding-right: 60px', () => {
    cy.viewport(1300, 800);
    cy.get('body').should('have.css', 'padding-right', '60px');
  });
});
