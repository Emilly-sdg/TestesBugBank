/// <reference types="cypress" />

describe('home', () => {
  it('Aplicação web deve estar online', () => {
    cy.visit('http://localhost:3000/')
  })
})