Cypress.Commands.add('createEmail', (email = '', nome = '', senha = '') => {
    //abrir o site

    cy.contains('button', 'Registrar')
        .click()

    cy.get('input[placeholder="Informe seu e-mail"]')
        .eq(1)
        .type(email, { force: true })

    cy.get('input[placeholder="Informe seu Nome"]')
        .type(nome, { force: true })

    cy.get('input[placeholder="Informe sua senha"]')
        .eq(1)
        .type(senha, { force: true })

    cy.get('input[placeholder="Informe a confirmação da senha"]')
        .type(senha, { force: true })

    cy.get('#toggleAddBalance')
        .click({ force: true })

    cy.contains('button', 'Cadastrar')
        .click({ force: true })
})

Cypress.Commands.add('login', (email = '', senha = '') => {
    //abrir o site
    cy.get('input[placeholder="Informe seu e-mail"]')
        .eq(0)
        .type(email)

    cy.get('input[placeholder="Informe sua senha"]')
        .eq(0)
        .type(senha)

    cy.contains('button', 'Acessar')
        .click()


    

})