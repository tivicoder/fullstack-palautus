describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ name:'test name', username:'test username', password:'test password'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').contains('username:')
    cy.get('form').contains('password:')
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test username')
      cy.get('#password').type('test password')
      cy.get('button').contains('login').click()
      cy.contains('test name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('not existing user')
      cy.get('#password').type('test password')
      cy.get('button').contains('login').click()
      cy.contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
