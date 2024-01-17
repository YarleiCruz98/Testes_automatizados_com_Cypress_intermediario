describe('logout', () => {

    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: true }

    beforeEach(() => {
        cy.doLogin(user, password, options)
    })

    it('logout successfully', () => {
        cy.url().should('not.include', '/users/sign_in')
        cy.doLogout(user)
        cy.url().should('include', '/users/sign_in')
    })

})