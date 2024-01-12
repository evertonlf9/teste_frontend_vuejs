import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/cadastro-produto',
    name: 'productCreate',
    component: () => import('../views/Products/Detail'),
  },
  {
    path: '/editar-produto/:id',
    name: 'productEdit',
    component: () => import('../views/Products/Detail'),
  },
  {
    path: '/lista-produto',
    name: 'product',
    component: () => import('../views/Products/List'),
  },
  {
    path: '/cadastro-cliente',
    name: 'customer',
    component: () => import('../views/Customer/Detail'),
  },
  {
    path: '/editar-cliente/:id',
    name: 'customerEdit',
    component: () => import('../views/Customer/Detail'),
  },
  {
    path: '/lista-clientes',
    name: 'customerList',
    component: () => import('../views/Customer/List'),
  },
  {
    path: '/associar-produtos',
    name: 'associateProducts',
    component: () => import('../views/AssociateProducts.vue'),
  },
  {
    path: '/associar-produtos/:id',
    name: 'associateProductsEdit',
    component: () => import('../views/AssociateProducts.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
