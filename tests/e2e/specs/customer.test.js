describe('Testing the customer registry page', () => {
  it('Testing whether it is possible to access the customer registration page', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(1).click();
    cy.wait(500);

    cy.contains('div', 'Cadastro de Cliente');
  });

  it('Checking whether it is possible to create a new customer', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(1).click();
    cy.wait(500);

    cy.get('[data-cy="form-name').type('João Silva');
    cy.get('[data-cy="form-email').type('joaosilva@gmail.com');
    cy.get('[data-cy="form-phone').type('14 998523514');
    cy.get('[data-cy="form-document').type('782998523514');
    cy.get('[data-cy="form-active"]').click();
    cy.get('[data-cy="btn-customer-create"]').click();
    cy.wait(500);
    cy.contains('div', 'Novo cliente criado sucesso!');
  });

  it('Checking if it is possible to cancel the creation of a customer', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(1).click();
    cy.wait(500);

    cy.get('[data-cy="form-name').type('João Silva');
    cy.get('[data-cy="form-email').type('joaosilva@gmail.com');
    cy.get('[data-cy="form-phone').type('14 998523514');
    cy.get('[data-cy="form-document').type('782998523514');
    cy.get('[data-cy="form-active"]').click();
    cy.get('[data-cy="btn-customer-cancel"]').click();
    cy.wait(500);
    cy.contains('h1', 'Bem-vindo ao sistema de cadastro');
  });

  it('Checking if it is possible to insert a product without a name and document', () => {
    cy.visit('/');
    cy.get('.ant-menu > .ant-menu-item').eq(1).click();
    cy.wait(500);

    cy.get('[data-cy="form-email').type('joaosilva@gmail.com');
    cy.get('[data-cy="form-phone').type('14 998523514');
    cy.get('[data-cy="form-active"]').click();
    cy.get('[data-cy="btn-customer-create"]').click();
    cy.wait(500);
    cy.contains('div', 'Campo nome do cliente é obrigatório!');
    cy.contains('div', 'Campo documento é obrigatório!');
  });
});
