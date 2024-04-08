describe('Registration Page', () => {
  beforeEach(() => {
    cy.wait(2000);
    cy.visit('http://localhost:8000/html/registrationPage.html');
  });

  it('dont allow registration with a invalid email', () => {
    cy.get('#username').type('FoodHub');
    cy.get('#email').type('invalidemail.com');
    cy.get('#password').type('Foodhub12345');
    cy.get('#passwordAgain').type('Foodhub12345');
    cy.get('#password').should('have.value', 'Foodhub12345');
    cy.get('#passwordAgain').should('have.value', 'Foodhub12345');
    cy.get('.regButton-frame').click();
    cy.get('#email:invalid').should('have.attr', 'required');
    cy.url().should('eq', 'http://localhost:8000/html/registration.html');
  });

  it('allows registration with a valid email', () => {

    cy.request({
      method: 'DELETE',
      url: '/api/deleteUser',
      body: {
        email: 'validemail@example.com'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.get('#username').type('FoodHub');
    cy.get('#email').type('validemail@example.com');
    cy.get('#password').type('Foodhub12345');
    cy.get('#passwordAgain').type('Foodhub12345');
    cy.get('#password').should('have.value', 'Foodhub12345');
    cy.get('#passwordAgain').should('have.value', 'Foodhub12345');
    cy.get('.regButton-frame').click();
    cy.url().should('eq', 'http://localhost:8000/html/loginPage.html');

    cy.request({
      method: 'DELETE',
      url: '/api/deleteUser',
      body: {
        email: 'validemail@example.com'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('can redirect to login page', () => {
    cy.get('.regTologText-span-a > a').click();
    cy.url().should('eq', 'http://localhost:8000/html/loginPage.html');
  });
});

describe('Responsive Design Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/registrationPage.html');
  });

  it('320-375px: Absolute logo, no border', () => {
    cy.viewport(350, 800);
    cy.get('body').should('have.css', 'padding-right', '0px');
    cy.get('.logo').should('have.css', 'position', 'absolute');
    cy.get('.logo').should('have.css', 'top', '-100px');
    cy.get('.logo').should('have.css', 'background-position', '50% 50%');
    cy.get('.border').should('have.css', 'border', '0px none rgb(0, 0, 0)');
  });

  it('375-425px: Absolute logo', () => {
    cy.viewport(400, 800);
    cy.get('body').should('have.css', 'padding-right', '0px');
    cy.get('.logo').should('have.css', 'position', 'absolute');
    cy.get('.logo').should('have.css', 'top', '-100px');
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

describe('Input fields', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/registrationPage.html');
  });
  it('validates input fields', () => {
    cy.get('.regButton-frame').click();
    cy.get('#username').should('have.attr', 'required');
    cy.get('#email').should('have.attr', 'required');
    cy.get('#password').should('have.attr', 'required');
    cy.get('#passwordAgain').should('have.attr', 'required');
  });
});

describe('Registration Page Elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/html/registrationPage.html');
  });

  it('Page elements', () => {
    cy.get('.frame-1').should('exist');
    cy.get('.logo').should('exist');
    cy.get('.regisztralj').should('exist');
    cy.get('#username').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('#passwordAgain').should('exist');
    cy.get('.regButton-frame').should('exist');
    cy.get('.regTologText').should('exist');
    cy.get('#username').should('have.attr', 'placeholder', 'Pl.: FoodHub');
    cy.get('#email').should('have.attr', 'placeholder', 'Pl.: foodhub@gmail.com');
    cy.get('#password').should('have.attr', 'placeholder', 'Pl.: Foodhub12345');
    cy.get('#passwordAgain').should('have.attr', 'placeholder', 'Pl.: Foodhub12345');
    cy.get('#username').should('have.attr', 'required');
    cy.get('#email').should('have.attr', 'required');
    cy.get('#password').should('have.attr', 'required');
    cy.get('#passwordAgain').should('have.attr', 'required');
    cy.get('.regButton-frame').should('contain.text', 'Regisztrálás');
    cy.get('.regTologText').should('contain.text', 'Már van fiókod?');
    cy.get('.regTologText-span-a > a').should('contain.text', 'Jelentkezz be.');
  });
});

