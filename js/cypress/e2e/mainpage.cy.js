describe('template spec', () => {

  beforeEach (() => {
    cy.visit('http://localhost:8000/')
  });


  it('URl is fine', () => {
    cy.visit('http://localhost:8000/')
  })

  it('Navbar loaded successfully', () => {
    cy.get('.navbar').should('be.visible')
  });

  it('Background Image loaded successfully', () => {
    cy.get('.background_image').should('be.visible')
  });
})