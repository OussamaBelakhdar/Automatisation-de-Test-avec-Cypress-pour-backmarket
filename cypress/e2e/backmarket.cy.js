/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
const registeredEmail = faker.internet.email()
const registerdPassword = faker.internet.password(15, false, /[a-zA-Z0-9]/)

describe('inscription réussie', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('https://preprod.backmarket.fr/fr-fr/register')
  })
  it('remplissage correct du formulaire et soumission', () => {
    cy.get('[data-qa="accept-cta"]').click()
    cy.get('#firstName').type(faker.name.firstName())
    cy.get('#lastName').type(faker.name.lastName())
    cy.get('#signup-email').type(registeredEmail)
    cy.get('#signup-password').type(registerdPassword)
    cy.get('[data-qa="signup-submit-button"]').click()
    cy.wait(5000)
    cy.url().then(actualUrl => {
      expect(actualUrl).to.include('/dashboard')
    })
  })
})

describe('inscription échouée', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('https://preprod.backmarket.fr/fr-fr/register')
  })
  it('remplissage du formulaire avec mot de passe trop court et soumission', () => {
    cy.get('[data-qa="accept-cta"]').click()
    cy.get('#firstName').type(faker.name.firstName())
    cy.get('#lastName').type(faker.name.lastName())
    cy.get('#signup-email').type(faker.internet.email())
    cy.get('#signup-password').type(faker.internet.password(7))
    cy.get('[data-qa="signup-submit-button"]').click()
    cy.url().then(actualUrl => {
      expect(actualUrl).to.include('/register')
    })
  })
  it('remplissage du formulaire avec email invalide et soumission', () => {
    cy.get('[data-qa="accept-cta"]').click()
    cy.get('#firstName').type(faker.name.firstName())
    cy.get('#lastName').type(faker.name.lastName())
    cy.get('#signup-email').type(faker.name.fullName())
    cy.get('#signup-password').type(
      faker.internet.password(8, false, /[a-zA-Z0-9]/)
    )
    cy.get('[data-qa="signup-submit-button"]').click()
    cy.url().then(actualUrl => {
      expect(actualUrl).to.include('/register')
    })
  })
  it('remplissage du formulaire sans le prénom et soumission', () => {
    cy.get('[data-qa="accept-cta"]').click()
    cy.get('#lastName').type(faker.name.lastName())
    cy.get('#signup-email').type(faker.internet.email())
    cy.get('#signup-password').type(faker.internet.password(8))
    cy.get('[data-qa="signup-submit-button"]').click()
    cy.url().then(actualUrl => {
      expect(actualUrl).to.include('/register')
    })
  })
  it('remplissage du formulaire sans le nom et soumission', () => {
    cy.get('[data-qa="accept-cta"]').click()
    cy.get('#firstName').type(faker.name.firstName())
    cy.get('#signup-email').type(faker.internet.email())
    cy.get('#signup-password').type(faker.internet.password(8))
    cy.get('[data-qa="signup-submit-button"]').click()
    cy.url().then(actualUrl => {
      expect(actualUrl).to.include('/register')
    })
  })
})
describe('Authentification', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('https://preprod.backmarket.fr/fr-fr/register')
  })
  it('authentification réussie avec derniers identifiants corrects', () => {
    cy.get('[data-qa="accept-cta"]').click()
    cy.get('#signin-email').type(registeredEmail)
    cy.get('#signin-password').type(registerdPassword)
    cy.get('[data-qa="signin-submit-button"]').click()
    cy.wait(5000)
    cy.url().then(actualUrl => {
      expect(actualUrl).to.include('/dashboard')
    })
  })
})