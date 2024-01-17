// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('doLogin', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
) => {
    const doLogin = () => {
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
      cy.get('.qa-user-avatar')
        .should('be.visible')
    }
    
    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.eq', '/users/sign_in')
    }

    const options = {
      cacheAcrossSpecs: true,
      validate
    }
  
    if (cacheSession) {
      cy.session(user, doLogin, options)
    } else {
        doLogin()
    }
  })

Cypress.Commands.add('doLogout', (name) => {

    cy.get('[data-qa-selector="user_menu"]')
        .click();

    cy.get('.current-user')
        .contains(name)

    cy.get('.sign-out-link')
        .should('be.visible')
        .should('have.text', 'Sign out')
        .click()
})

Cypress.Commands.add('createProject', (projectName, projectDescription) => {
    cy.visit('/projects/new') 

    cy.get('#project_name')
        .type(projectName)
        .should('have.value', projectName)
    
    cy.get('#project_path')
        .should('have.value', projectName)    

    cy.get('#project_description')
        .type(projectDescription)
        
    cy.get('.qa-initialize-with-readme-checkbox')
        .check() 
        .should('be.checked')

    cy.contains('Create project')
        .click()

})

Cypress.Commands.add('CreateIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
  })
