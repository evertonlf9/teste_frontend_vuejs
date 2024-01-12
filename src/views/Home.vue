<template>
  <a-card title="Home" :bordered="false">
    <div class="home">
      <h1>Bem-vindo ao sistema de cadastro</h1>
      <div class="container-description">
        <p style="font-weight: 500">
          Nosso sistema de cadastro de cliente e produtos foi desenvolvido especialmente para
          atender às necessidades da área comercial da empresa. Ele é uma ferramenta fácil de usar,
          eficiente e com recursos avançados que auxiliam na gestão e organização das informações
          relacionadas aos clientes e produtos.
        </p>

        <p style="font-weight: 800">Principais recursos:</p>

        <ul>
          <li>
            Cadastro de clientes: O sistema permite o cadastro completo de informações dos clientes,
            como nome, endereço, telefone, e-mail, histórico de compras, entre outros. Além disso, é
            possível segmentar os clientes por categorias ou grupos, facilitando a segmentação e
            personalização das estratégias de vendas.
          </li>
          <li>
            Cadastro de produtos: Com o sistema, é possível cadastrar todos os produtos disponíveis
            para venda. É possível incluir informações como nome, descrição, preço, estoque
            disponível, fornecedor, entre outros detalhes. Isso permite um controle preciso dos
            produtos, evitando vendas de itens fora de estoque, por exemplo.
          </li>
          <li>
            Catálogo de produtos: O sistema possui um catálogo virtual onde é possível visualizar
            todos os produtos cadastrados, facilitando a consulta rápida e permitindo que os
            vendedores mostrem aos clientes os produtos disponíveis.
          </li>
          <li>
            Controle de vendas: O sistema permite registrar todas as vendas realizadas pela empresa.
            É possível incluir informações como data, cliente, produtos vendidos, valor total da
            venda, entre outros detalhes. Isso proporciona um histórico completo das transações
            comerciais, auxiliando na análise de desempenho e no planejamento financeiro.
          </li>
          <li>
            Relatórios e métricas: O sistema gera relatórios e métricas que auxiliam na análise do
            desempenho da área comercial, como vendas por cliente, vendas por produto, ticket médio,
            entre outras informações relevantes. Esses relatórios são fundamentais para identificar
            oportunidades de crescimento e melhorar a estratégia de vendas.
          </li>
          <li>
            Integração com outros sistemas: Nosso sistema pode ser integrado a outros sistemas, como
            o ERP da empresa, facilitando a troca de informações entre os diferentes setores da
            empresa.
          </li>
        </ul>

        <p style="font-weight: 500">
          Com nosso sistema de cadastro de cliente e produtos, sua empresa terá uma gestão
          simplificada e eficiente das vendas, possibilitando uma maior produtividade e melhor
          atendimento aos clientes.
        </p>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style>
.ant-card {
  max-width: 90%;
  margin: 2rem auto;
}

.container-description {
  text-align: justify;
  max-width: 800px;
  margin: 0 auto;
}

li {
  margin: 1rem 0;
}

.ant-card-head,
h1 {
  text-align: center;
}
</style>
