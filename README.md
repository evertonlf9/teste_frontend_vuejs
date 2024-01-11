# Projeto - teste-frontend-vuejs

# VUE version 3.2.13

# Author: Everton Ferreira

## Conteúdo

- [Visão Geral do Projeto](#visão-geral-do-projeto)
  - [Tecnologias](#tecnologias)
  - [Documentação API](#documentação-api)
- [Informações Iniciais](#informações-iniciais)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Instalando as Dependências do Front-end](#instalando-as-dependências-front-end)
  - [Instalando as Dependências do Back-end](#instalando-as-dependências-back-end)
- [Servidor de Desenvolvimento Front-end](#servidor-de-desenvolvimento-front-end)
- [Servidor de Desenvolvimento Back-end](#servidor-de-desenvolvimento-back-end)
- [Testes](#testes)

## Visão Geral do Projeto

O principal objetivo do desafio é disponibilizar um cadastro de clientes e produtos e uma forma de associação dos produtos para esse cliente.

### Tecnologias

- HTML5
- TypeScript
- vue 3
- Jest
- Cypress

### Documentação API

Para obter a lista de produtos: GET http://localhost:3000/produtos
Para obter a lista de clientes: GET http://localhost:3000/clientes
Para adicionar um novo produto: POST http://localhost:3000/produtos (defina o corpo da solicitação no formato JSON com as propriedades name e active)
Para adicionar um novo cliente: POST http://localhost:3000/clientes (defina o corpo da solicitação no formato JSON com as propriedades name, email, document, phone, active)

## Informações Iniciais

Para realizar as ações a seguir, será necessário que tenha instalado em seu computador o **git** e o **node.js**. Abaixo seguem os sites para realizar o download e efetuar a instalação:

- [Git](https://git-scm.com/downloads)
- [Node.js - Windows/Mac](https://nodejs.org/en/download/)
- [Node.js - Linux](https://nodejs.org/en/download/package-manager/)

### Clonando o Repositório

Primeiro é preciso que efetue a clonagem do repositório para o seu computador para assim efetuar alterações de código. Para isso basta subir a página e clicar no botão de mesmo nome e aguardar alguns minutos. Depois basta clicar em **clone or download** e copiar a URL do respositório.

Já abrindo o bash do Git ou o Terminal para efetuar a clonagem será necessário que digite a seguinte linha de código e informe a URL copiada anteriormente:

```git
git clone <url-do-repositorio>
```

### Instalando as Dependências Front-end

Para instalar as dependências do projeto basta abrir o **Prompt de Comando do Node.js** (caso você esteja no linux, basta utilizar o terminal), acessar a pasta do repositório e inserir o seguinte comando:

```node
npm install
```

### Instalando as Dependências Back-end

Para instalar as dependências do projeto basta abrir o **Prompt de Comando do Node.js** dentro da pasta api-produto-cliente (caso você esteja no linux, basta utilizar o terminal), e inserir o seguinte comando:

```node
npm install
```

## Servidor de Desenvolvimento do Front-end

Para iniciar o app basta abrir o git ou treminal dentro da pasta do projeto e executar o seginte comando:

```node
npm run serve
```

O código irá rodar o plugin **serve**, dessa forma gerando um servidor para o desenvolvimento (`http://localhost:8080/`) sendo assim toda alteração de código nos arquivos de origem irá recarregar automaticamente a página.

## Servidor de Desenvolvimento do Back-end

Para iniciar o app basta abrir o git ou treminal dentro da pasta do projeto (api-produto-cliente) e executar o seginte comando:

```node
npm run start
```

O código irá rodar o plugin **serve**, dessa forma gerando um servidor para o desenvolvimento (`http://localhost:3002`).

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```
