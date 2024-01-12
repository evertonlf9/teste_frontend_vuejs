describe('Testing the product-customer association page', () => {
  it('Testando se há produtos na lista', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(5).click();
    cy.wait(500);

    cy.contains('div', 'Associar Produtos aos Clientes');
    cy.contains('div', 'Produto 1');
  });

  it('Testing whether it is possible to associate a product with a customer', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(5).click();
    cy.wait(500);
    cy.get('#rc_select_0').type('Cliente 1');
    cy.get('.rc-virtual-list-holder-inner > :nth-child(1n)').click();
    cy.get('[data-row-key="abc123"] > .ant-table-cell .ant-checkbox').click();
    cy.get('[data-cy="btn-confirm"]').click();
  });

  it('Testing whether it is possible to associate all products with a customer', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(5).click();
    cy.wait(500);
    cy.get('#rc_select_0').type('Cliente 2');
    cy.get('.rc-virtual-list-holder-inner > :nth-child(1n)').click();
    cy.get('.ant-table-selection .ant-checkbox').click();
    cy.get('[data-cy="btn-confirm"]').click();
  });

  it('Testing whether you can unassociate a product from a customer', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(5).click();
    cy.wait(500);
    cy.get('#rc_select_0').type('Cliente 1');
    cy.get('.rc-virtual-list-holder-inner > :nth-child(1n)').click();
    cy.get('[data-row-key="abc123"] > .ant-table-cell .ant-checkbox').click();
    cy.get('[data-cy="btn-cancel"]').click();
  });
});
