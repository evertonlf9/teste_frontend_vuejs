describe('Testing the customer listing page', () => {
  it('Testing whether there are customer in the list', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(2).click();
    cy.wait(500);

    cy.contains('div', 'Lista de Clientes');
    cy.contains('div', 'Cliente 3');
    cy.contains('div', 'cliente1@example.com');
  });

  it('Testing if it is possible to go to the customer editing screen', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(2).click();
    cy.wait(1500);
    cy.get('[data-cy="customer-open-xyz456"]').trigger('mouseover');
  });
});
