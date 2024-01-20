import { faker } from '@faker-js/faker'
describe('new project', () => {
    
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const projectName = `project-${faker.datatype.uuid()}`;
    const description = faker.random.words(10);
    const options = { env: { snapshotOnly: true } }

    beforeEach(() => {
        cy.doLogin(user, password, options)
        cy.api_deleteProjects()
      })

    it('create a new project', options, () => {
        
        cy.createProject(projectName, description)
        cy.url()
            .should('include',`/${user}/${projectName}` )
        cy.contains(projectName).should('be.visible')
        cy.contains(description).should('be.visible')    
    })
    
})