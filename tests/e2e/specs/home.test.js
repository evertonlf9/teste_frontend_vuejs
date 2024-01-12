describe('Testing the home page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Bem-vindo ao sistema de cadastro');
    cy.contains(
      'p',
      'Nosso sistema de cadastro de cliente e produtos foi desenvolvido especialmente para atender às necessidades da área comercial da empresa. Ele é uma ferramenta fácil de usar, eficiente e com recursos avançados que auxiliam na gestão e organização das informações relacionadas aos clientes e produtos.',
    );
    cy.contains('p', 'Principais recursos:');
    cy.wait(500);
    cy.get('.ant-menu > :nth-child(4n)').click();
    cy.wait(1500);
  });
});
