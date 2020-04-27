describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ name:'test name', username:'test username', password:'test password' })
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test username', password: 'test password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.contains('create').click()
      cy.contains('a new blog new title by new author added')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('new title new author')
    })
    describe.only('With existing blogs', function() {
      beforeEach(function() {
        cy.createBlog({ author: 'author1', title: 'title1', url: 'url1' })
      })
      it('A blog can be liked', function() {
        cy.contains('title1').parent().as('blog').contains('view').click()
        cy.get('@blog').contains('likes 0')
        cy.get('@blog').contains('like').click()
        cy.get('@blog').contains('likes 1')
      })
    })
  })
})
