<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <a-card title="Lista de Produtos" :bordered="false">
    <a-row>
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 12, offset: 6 }">
        <a-table :columns="columns" bordered :dataSource="dataSource" :rowKey="'id'">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'active'">
              {{ record.active ? 'Sim' : 'Não' }}
            </template>

            <template v-if="column.key === 'action'">
              <a-dropdown>
                <a-button :data-cy="`customer-open-${record.id}`"><SettingOutlined /></a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1" data-cy="product-edit" @click="editClick(record.id)">
                      <EditOutlined />
                      Editar
                    </a-menu-item>
                    <a-menu-item key="2">
                      <SwapOutlined />
                      <a-popconfirm
                        title="Deseja realmente alterar o estado desse produto?"
                        data-cy="product-popoup"
                        @confirm="updateClick(record)"
                      >
                        <a>{{ record.active ? 'Desativar' : 'Ativar' }}</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { IProduct } from '@/services';
import useProducts from '@/hooks/useProducts';
import { EditOutlined, SwapOutlined, SettingOutlined } from '@ant-design/icons-vue';
// eslint-disable-next-line import/no-cycle
import router from '@/router';

const dataSource = ref<IProduct[]>([]);

export default defineComponent({
  name: 'ProductList',
  components: {
    EditOutlined,
    SwapOutlined,
    SettingOutlined,
  },
  setup() {
    const { getAllProducts, updateStatusProduct } = useProducts();

    const updateClick = (row: IProduct) => {
      const newRow = row;
      newRow.active = !row.active;
      updateStatusProduct(newRow, () => {
        getAllProducts((data: IProduct[]) => {
          dataSource.value = data;
        });
      });
    };

    const editClick = (id: string) => {
      router.push(`/editar-produto/${id}`);
    };

    onMounted(() => {
      getAllProducts((data: IProduct[]) => {
        dataSource.value = data;
      });
    });

    return {
      dataSource,
      updateClick,
      editClick,

      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
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
