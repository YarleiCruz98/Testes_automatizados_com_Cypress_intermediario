import { faker } from '@faker-js/faker'

describe('Create Issue', () => {

  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  beforeEach(() => {
    cy.doLogin()
    cy.api_deleteProjects()
    cy.api_createProject(issue.project)
  })

  it('successfully', () => {
    cy.CreateIssue(issue)
    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
  
})  