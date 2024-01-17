describe('login', () => {


  it('login successfully', () => {

    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.doLogin(user, password, options) 
    cy.get('.qa-user-avatar').should('be.visible')

  })

})
