<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <a-card title="Lista de Produtos" :bordered="false">
    <a-row>
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 6 }">
        <a-table :columns="columns" bordered :dataSource="dataSource" :rowKey="'id'">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'active'">
              {{ record.active ? 'Sim' : 'Não' }}
            </template>

            <template v-if="column.key === 'action'">
              <a-dropdown-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1" @click="routerEditPage(record.id)">
                      <EditOutlined />
                      Editar
                    </a-menu-item>
                    <a-menu-item key="2">
                      <SwapOutlined />
                      <a-popconfirm
                        title="Deseja realmente alterar o estado desse produto?"
                        @confirm="updateClick(record)"
                      >
                        <a>{{ record.active ? 'Desativar' : 'Ativar' }}</a>
                      </a-popconfirm>
                    </a-menu-item>
                    <a-menu-item key="3" @click="routerAssocientePage(record.id)">
                      <DiffOutlined />
                      Associar Produtos
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown-button>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ICustomer } from '@/services';

// eslint-disable-next-line import/no-cycle
import useCustomer from '@/hooks/useCustomer';

import { EditOutlined, SwapOutlined, DiffOutlined } from '@ant-design/icons-vue';

const dataSource = ref<ICustomer[]>([]);

export default defineComponent({
  name: 'CustomerList',
  components: {
    EditOutlined,
    SwapOutlined,
    DiffOutlined,
  },
  setup() {
    // eslint-disable-next-line object-curly-newline, operator-linebreak
    const { getAllCustomers, routerAssocientePage, routerEditPage, updateActiveCustomers } =
      useCustomer();

    const updateClick = (row: ICustomer) => {
      const newRow = row;
      newRow.active = !row.active;
      updateActiveCustomers(row, () => {
        getAllCustomers((data: ICustomer[]) => {
          dataSource.value = data;
        });
      });
    };

    onMounted(() => {
      getAllCustomers((data: ICustomer[]) => {
        dataSource.value = data;
      });
    });

    return {
      dataSource,
      updateClick,
      routerAssocientePage,
      routerEditPage,

      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Documento',
          dataIndex: 'document',
          key: 'document',
        },
        {
          title: 'Telefone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Ativo',
          dataIndex: 'active',
          key: 'active',
        },
        {
          title: 'Address',
          dataIndex: 'action',
          key: 'action',
          fixed: 'center',
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.ant-table-wrapper {
  overflow-x: auto;
}
.ant-card-head {
  text-align: center;
}
.ant-card {
  max-width: 90%;
  margin: 2rem auto;
}

.ant-btn-group {
  button:first-child {
    display: none;
  }
}

.ant-dropdown-trigger {
  border-radius: 6px;
}

.ant-dropdown-menu-title-content {
  svg {
    margin-right: 6px;
  }
}
</style>
