/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './app.css';

import './registerServiceWorker';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(Antd).use(router).mount('#app');
