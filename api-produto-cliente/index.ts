import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());

app.use(cors());

const DATABASE_FILE = 'data.json';

type Produto = {
  id?: string;
  name: string;
  active: boolean;
};

type Cliente = {
  id?: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  active: boolean;
};

type Association = {
  id?: string;
  customerId: string;
  customerName: string;
  customerActive?: boolean;
  products: Produto[];
};

let produtos: Produto[] = [];
let clientes: Cliente[] = [];
let associacao: Association[] = [];

if (fs.existsSync(DATABASE_FILE)) {
  const data = fs.readFileSync(DATABASE_FILE, 'utf-8');
  const json = JSON.parse(data);

  produtos = json.produtos;
  clientes = json.clientes;
  associacao = json.associacao;
}

function salvarBancoDeDados() {
  const data = JSON.stringify({ produtos, clientes, associacao });
  fs.writeFileSync(DATABASE_FILE, data, 'utf-8');
}

app.get('/associar-produtos-clientes', (req, res) => {
  res.json(associacao);
});

app.get('/associar-produtos-clientes/:id', (req, res) => {
  const result = associacao.find((item) => item.id === req.params.id);
  res.json(result || []);
});

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/clientes', (req, res) => {
  res.json(clientes);
});

app.get('/produtos/:id', (req, res) => {
  const result = produtos.find((prod) => prod.id === req.params.id);
  res.json(result || []);
});

app.get('/clientes/:id', (req, res) => {
  const result = clientes.find((prod) => prod.id === req.params.id);
  res.json(result || []);
});

app.post('/produtos', (req, res) => {
  console.log(req.body);
  const novoProduto: Produto = {
    id: Math.random().toString(36).substr(2, 9),
    name: req.body.name,
    active: req.body.active,
  };

  produtos.push(novoProduto);
  salvarBancoDeDados();

  res.json(novoProduto);
});

app.put('/produtos', (req, res) => {
  const { id } = req.body;
  const index = produtos.findIndex((prod) => prod.id === id);
  produtos[index] = req.body;

  salvarBancoDeDados();
  res.status(200);
});

app.post('/clientes', (req, res) => {
  const novoCliente: Cliente = {
    id: Math.random().toString(36).substr(2, 9),
    name: req.body.name,
    document: req.body.document,
    phone: req.body.phone,
    active: req.body.active,
    email: req.body.email,
  };

  clientes.push(novoCliente);
  salvarBancoDeDados();

  res.json(novoCliente);
});

app.put('/clientes', (req, res) => {
  const { id } = req.body;
  const index = clientes.findIndex((client) => client.id === id);
  clientes[index] = req.body;

  salvarBancoDeDados();
  res.json(clientes);
});

app.post('/associar-produtos-clientes', (req, res) => {
  console.log(req.body);
  const novaAssociacao: Association = {
    id: Math.random().toString(36).substr(2, 9),
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    customerActive: req.body.customerActive,
    products: req.body.products,
  };

  associacao.push(novaAssociacao);
  salvarBancoDeDados();

  res.json(associacao);
});

app.put('/associar-produtos-clientes', (req, res) => {
  const { id } = req.body;
  const index = associacao.findIndex((prod) => prod.id === id);
  associacao[index] = req.body;

  salvarBancoDeDados();
  res.json(associacao);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
