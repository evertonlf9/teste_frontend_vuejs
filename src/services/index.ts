import axios from 'axios';

export interface ICustomer {
  id?: string;
  name: string,
  document:string,
  email: string,
  phone: string,
  active: boolean
}

export interface IProduct { id?: string, name: string, active: boolean }

export interface IAssociation {
  id?: string;
  customerId: string;
  customerName: string;
  customerActive?: boolean;
  products: IProduct[];
}
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default {
  getCustomers() {
    return api.get('/clientes');
  },

  getProducts() {
    return api.get('/produtos');
  },

  getAssociations() {
    return api.get('/associar-produtos-clientes');
  },

  getCustomerById(id: string | string[]) {
    return api.get(`/clientes/${id}`);
  },

  getProductById(id: string | string[]) {
    return api.get(`/produtos/${id}`);
  },

  postCustomers(palyload: ICustomer) {
    return api.post('/clientes', palyload);
  },

  putCustomers(palyload: ICustomer) {
    return api.put('/clientes', palyload);
  },

  postProducts(palyload: IProduct) {
    return api.post('/produtos', palyload);
  },

  putProducts(palyload: IProduct) {
    return api.put('/produtos', palyload);
  },

  postAssociation(palyload: IAssociation) {
    return api.post('/associar-produtos-clientes', palyload);
  },

  putAssociation(palyload: IAssociation) {
    return api.put('/associar-produtos-clientes', palyload);
  },
};
