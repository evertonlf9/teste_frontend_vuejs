describe('Testing the product listing page', () => {
  it('Testing whether there are products in the list', () => {
    cy.visit('/');
    cy.get('.ant-menu > :nth-child(5n)').click();
    cy.wait(500);

    cy.contains('div', 'Lista de Produtos');
    cy.wait(500);
    cy.contains('div', 'Produto 1');
    cy.contains('div', 'Produto 3');
  });

  it('Testing if it is possible to go to the product editing screen', () => {
    cy.visit('/');
    cy.get('.ant-menu > :nth-child(5n)').click();
    cy.wait(500);
    cy.get('[data-cy="customer-open-rrt1q17gs"]').first().trigger('mouseover');
    cy.wait(50);
    // cy.get('[data-cy="product-edit"]').click();
    // cy.wait(500);
  });
});
