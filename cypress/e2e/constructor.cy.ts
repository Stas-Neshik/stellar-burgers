import * as orderFake from '../fixtures/order.json';

const bun = '[data-ingredient="bun"]';
const main = '[data-ingredient="main"]';
const sauce = '[data-ingredient="sauce"]';
const modals = '#modals';

describe('Тестирование конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Тестирование существования компонента', () => {
    cy.get('[data-ingredient="bun"]').as('ingridientBun');
    cy.get(bun).should('be.exist');
    cy.get(main).should('be.exist');
    cy.get(sauce).should('be.exist');
  });

  describe('Тестирование модального окна', () => {

    it('Тестирование открытия модального окна', () => {
      cy.get(bun).click();
      cy.get(modals).children().should('have.length', 2);
    });

    it('Закрытие модального окна по кнопке', () => {
      cy.get(bun).click();
      cy.get('#modals button:first-of-type').click();
      cy.wait(500);
      cy.get(modals).children().should('have.length', 0);
    });

    it('Закрытие модального окна на оверлей', () => {
      cy.get(bun).click();
      cy.get('#modals>div:nth-of-type(2)').click({ force: true });
      cy.wait(500);
      cy.get(modals).children().should('have.length', 0);
    });
  });

  describe('тестирование создания заказа', () => {
    beforeEach(() => {
  
      cy.setCookie('accessToken', 'FAKE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'FAKE_REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
      cy.visit('/');
    });

    it('тестирование оформления заказа', () => {
      cy.get(bun).contains('Добавить').click();
      cy.get(main).contains('Добавить').click();
      cy.get('[data-order-button]').click();
      cy.get(modals).children().should('have.length', 2);
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFake.order.number
      );
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});

