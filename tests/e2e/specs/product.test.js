describe('Testing the product registry page', () => {
  it('Checking whether it is possible to create a new product', () => {
    cy.visit('/');
    cy.get('.ant-menu > :nth-child(4n)').click();
    cy.wait(500);

    cy.contains('div', 'Cadastro de Produtos');
    cy.get('[data-cy="form-name').type('Novo Produto');
    cy.get('[data-cy="form-active"]').click();
    cy.get('[data-cy="btn-product-create"]').click();
    cy.wait(500);
    cy.contains('div', 'Novo produto criado sucesso!');
  });

  it('Checking if it is possible to cancel the creation of a product', () => {
    cy.visit('/');
    cy.get('.ant-menu > :nth-child(4n)').click();
    cy.wait(500);

    cy.contains('div', 'Cadastro de Produtos');
    cy.get('[data-cy="form-name').type('Novo Produto');
    cy.get('[data-cy="form-active"]').click();
    cy.get('[data-cy="btn-product-cancel"]').click();
    cy.wait(500);
    cy.contains('h1', 'Bem-vindo ao sistema de cadastro');
  });

  it('Checking if it is possible to insert a product without a name', () => {
    cy.visit('/');
    cy.get('.ant-menu > :nth-child(4n)').click();
    cy.wait(500);

    cy.contains('div', 'Cadastro de Produtos');
    cy.get('[data-cy="form-active"]').click();
    cy.get('[data-cy="btn-product-create"]').click();
    cy.wait(500);
    cy.contains('div', 'Campo nome do produto é obrigatório!');
  });
});
