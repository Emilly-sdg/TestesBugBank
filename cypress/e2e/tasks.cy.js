/// <reference types="cypress" />


describe('casos de teste', () => {

    context('cadastro', () => {
        it('cadastro com email inválido', () => {
            //entrar no site
            cy.visit('http://localhost:3000/')

            //clicar no botão e verificar se a tela de cadastro está visivel
            cy.contains('button', 'Registrar')
                .click()
            cy.get('div.card__register')
                .should('be.visible')

            //acessar e preencher o campo com e-mail invalido
            cy.get('input[placeholder="Informe seu e-mail"]')
                .eq(1)
                .type('email_errado.com', { force: true })

            cy.contains('p', 'Formato inválido')
                .should('be.visible') //O cypress não está considerando o elemento como visivel, apesar de estar.
        })

        it('cadastro com email válido', () => {
            const email = 'test@test.com'
            const nome = 'Emilly Santos Duarte'
            const senha = '1234567e'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#modalText')
                .should('be.visible')
        })

    })

    context('login', () => {
        it('login com e-mail inválido', () => {

            cy.visit('http://localhost:3000/')

            cy.get('input[placeholder="Informe seu e-mail"]')
                .eq(0)
                .type('email_errado.com')

            cy.contains('p', 'Formato inválido')
                .should('be.visible')
        })

        it('login com e-mail/senha não cadastrados', () => {
            const email = 'email@inexistente.com'
            const senha = '12345679'

            cy.visit('http://localhost:3000/')

            cy.login(email, senha)


            cy.get('#modalText')
                .should('be.visible')
                .should('have.text', 'Usuário ou senha inválido.\nTente novamente ou verifique suas informações!')

        })

        it('login com e-mail/senha cadastrados', () => {
            const email = 'test@teste.com'
            const senha = '1234567e'
            const nome = 'Emilly Santos'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#modalText')
                .should('be.visible')
            //    .should('have.text', 'A conta '+ ' foi criada com sucesso')

            cy.get('#btnCloseModal').click()

            cy.login(email, senha)

            cy.url()
                .should('be.equal', 'http://localhost:3000/home')

            cy.get('#textName')
                .should('have.text', 'Olá ' + nome + ',')

            cy.get('#textAccountNumber')
                .should('be.visible')


        })

    })
    context('Transferêcia', () => {
        it('transferência para a mesma conta', () => {
            const email = 'test@teste.com'
            const senha = '1234567e'
            const nome = 'Emilly Santos'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#btnCloseModal').click()

            cy.login(email, senha)

            cy.get('#textAccountNumber > span')
                .should('be.visible')

            cy.get('#textAccountNumber > span').invoke('text').then(($el) => {
                Cypress.env('numeroConta', $el)
                cy.log(Cypress.env('numeroConta')
                )

                const conta = Cypress.env('numeroConta')
                const partes = conta.split('-')
                const numero = partes[0]
                const digito = partes[1]


                cy.get('#btn-TRANSFERÊNCIA')
                    .click()

                cy.get('input[placeholder="Informe o número da conta"]')
                    .type(numero)

                cy.get('input[placeholder="Informe o dígito da conta"]')
                    .type(digito)

                cy.get('input[placeholder="Informe o valor da transferência"]')
                    .type('1')

                cy.contains('button', 'Transferir agora')
                    .click()

                cy.get('#modalText')
                    .should('be.visible')
                    .should('have.text', 'Nao pode transferir pra mesmo conta')

            })

        })
        it('transferência com valor negativo', () => {
            const email = 'test@teste.com'
            const senha = '1234567e'
            const nome = 'Emilly Santos'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#btnCloseModal').click()

            cy.login(email, senha)

            cy.get('#btn-TRANSFERÊNCIA')
                .click()

            cy.get('input[placeholder="Informe o valor da transferência"]')
                .type('-15')

            cy.contains('button', 'Transferir agora')
                .click()

            cy.get('#modalText')
                .should('be.visible')
                .should('have.text', 'Valor da transferência não pode ser 0 ou negativo')

        })

        it('transferência com informações válidas', () => {
            var email = 'test@teste.com'
            var senha = '1234567e'
            var nome = 'Emilly Santos'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#btnCloseModal').click()

            cy.login(email, senha)

            cy.get('#textAccountNumber > span')
                .should('be.visible')

            cy.get('#textAccountNumber > span').invoke('text').then(($el) => {
                Cypress.env('numeroConta', $el)
                cy.log(Cypress.env('numeroConta'))

                const conta = Cypress.env('numeroConta')
                const partes = conta.split('-')
                const numero = partes[0]
                const digito = partes[1]

                cy.get('#btnExit').click()

                var email = 'teste@teste.com'
                var senha = '1234567e'
                var nome = 'Emilly Gomes'

                cy.createEmail(email, nome, senha)

                cy.get('#btnCloseModal').click()

                cy.login(email, senha)

                cy.get('#btn-TRANSFERÊNCIA')
                    .click()

                cy.get('input[placeholder="Informe o número da conta"]')
                    .type(numero)

                cy.get('input[placeholder="Informe o dígito da conta"]')
                    .type(digito)

                cy.get('input[placeholder="Informe o valor da transferência"]')
                    .type('1')

                cy.contains('button', 'Transferir agora')
                    .click()

                cy.get('#modalText')
                    .should('be.visible')
                    .should('have.text', 'Transferencia realizada com sucesso')
            })

        })
    })

    context('Extrato', () => {
        it('Saldo em conta e Saldo diponível', () => {
            var email = 'test@teste.com'
            var senha = '1234567e'
            var nome = 'Emilly Santos'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#btnCloseModal').click()

            cy.login(email, senha)

            cy.get('#textBalance > span')
                .should('be.visible').wait(1000)

            cy.get('#textBalance > span')
                .invoke('text')
                .then(cy.log)
                .then((saldoConta) => {
                    cy.get('#btn-EXTRATO').click()
                    cy.get('#textBalanceAvailable')
                        .should('be.visible').wait(1000)
                        .invoke('text')
                        .then(cy.log)
                        .then((saldoDisp) => {
                            expect(saldoConta).to.be.equal(saldoDisp)
                        })

                })
        })

        it.only('Valor abertura de conta', () => {
            var email = 'test@teste.com'
            var senha = '1234567e'
            var nome = 'Emilly Santos'

            cy.visit('http://localhost:3000/')

            cy.createEmail(email, nome, senha)

            cy.get('#btnCloseModal').click()

            cy.login(email, senha)

            cy.get('#btn-EXTRATO').click()

            cy.get('#textTransferValue').eq(0).invoke('text').then(($el) => {
                Cypress.env('aberturaConta', $el)
                cy.log(Cypress.env('aberturaConta'))
            
                const saldoAbertura = Cypress.env('aberturaConta')

                expect(saldoAbertura).to.be.equal('R$ 1.000,00')
            })

        })

    })
})