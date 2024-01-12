<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu-container">
    <div class="menu-container-btn">
      <a-button type="primary" style="margin: 1rem auto" @click="toggleCollapsed">
        <menu-fold-outlined v-if="state.collapsed" />
        <menu-unfold-outlined v-else />
      </a-button>
    </div>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="handlerClick"
    ></a-menu>
  </div>
</template>
<script lang="ts">
import { reactive, h } from 'vue';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserAddOutlined,
  FileAddOutlined,
  BarsOutlined,
  DiffOutlined,
} from '@ant-design/icons-vue';
import router from '@/router';

interface ItemsProps {
  id: number;
  name: string;
  key: string;
  icon(): void;
  label: string;
  title: string;
  redirect: string;
}

export default {
  name: 'CustomerItem',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });

    const items = reactive([
      {
        key: '0',
        icon: () => h(HomeOutlined),
        label: 'Home',
        title: 'Home',
        redirect: '/',
      },
      {
        key: '2',
        icon: () => h(UserAddOutlined),
        label: 'Cadastar Cliente',
        title: 'Cadastar Cliente',
        redirect: '/cadastro-cliente',
      },
      {
        key: '3',
        icon: () => h(BarsOutlined),
        label: 'Listar Cliente',
        title: 'Listar Cliente',
        redirect: '/lista-clientes',
      },
      {
        key: '4',
        icon: () => h(FileAddOutlined),
        label: 'Cadastar Produto',
        title: 'Cadastar Produto',
        redirect: '/cadastro-produto',
      },
      {
        key: '5',
        icon: () => h(BarsOutlined),
        label: 'Listar Produtos',
        title: 'Listar Produtos',
        redirect: '/lista-produto',
      },
      {
        key: '6',
        icon: () => h(DiffOutlined),
        label: 'Associar Produtos',
        title: 'Associar Produtos',
        redirect: '/associar-produtos',
      },
    ]);

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    const handlerClick = ({ item }: { item: ItemsProps }) => {
      router.push(item.redirect);
    };

    return {
      state,
      items,
      toggleCollapsed,
      handlerClick,
    };
  },
};
</script>

<style>
.menu-container {
  max-width: 256px;
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
  flex: 0;
}

.menu-container-btn {
  width: 100%;
  text-align: center;
}

.ant-menu-root {
  height: 100vh;
}

.ant-btn {
  margin-top: 1rem;
}
</style>
