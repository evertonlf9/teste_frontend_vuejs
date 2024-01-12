<template>
  <a-card title="Associar Produtos aos Clientes" :bordered="false">
    <a-row class="flex justify-center">
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 12, offset: 6 }">
        <a-select
          v-model:value="customerValue"
          show-search
          :allowClear="true"
          style="min-width: 200px"
          placeholder="Selecione um cliente"
          :options="optionsCustomers"
          :disabled="loading"
          @change="handleChange"
        ></a-select>
        <br />

        <a-table
          :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="dataSource"
          :rowKey="'id'"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'active'">
              {{ record.active ? 'Sim' : 'Não' }}
            </template>
          </template>
        </a-table>

        <a-form-item>
          <div class="flex justify-items-center w-full footer-form-container">
            <a-button type="primary" @click="handlerSave" :disabled="loading">
              Associar Produtos
            </a-button>
            <a-button style="margin-left: 10px" @click="handlerCancel" :disabled="loading"
              >Cancelar</a-button
            >
          </div>
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import { IAssociation, ICustomer, IProduct } from '@/services';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useAssociation from '@/hooks/useAssociation';

type Key = string | number;

interface IOptions {
  value: string;
  label: string;
  item: ICustomer;
}

export default defineComponent({
  name: 'AssociateProductsView',
  setup() {
    const route = useRoute();
    const { id } = route.params;

    // eslint-disable-next-line object-curly-newline, operator-linebreak
    const { create, getAllAssociations, getAllCustomers, getAllProducts, updated, loading } =
      useAssociation();

    const customerValue = ref<string | null>(null);
    const customerSelected = ref<ICustomer>({} as ICustomer);
    const optionsCustomers = ref<IOptions[]>([]);

    const dataSource = ref<IProduct[]>([]);
    const dataAssociations = ref<IAssociation[]>([]);

    const state = ref<{
      selectedRowKeys: Key[];
      selectedRow: IProduct[];
      loading: boolean;
    }>({
      selectedRowKeys: [],
      selectedRow: [],
      loading: false,
    });

    const setCustomer = (productsList: IProduct[]) => {
      const dataProductIds: any = productsList.map((item: IProduct) => item.id);
      state.value.selectedRowKeys = dataProductIds || [];
      state.value.selectedRow = productsList;
    };

    const getAll = (hasUpdate?: boolean) => {
      getAllAssociations((data: IAssociation[]) => {
        dataAssociations.value = data;
        if (id && !hasUpdate) {
          const result: IAssociation | undefined = data.find(
            (item: IAssociation) => item.customerId === id,
          );
          setCustomer(result?.products || []);
        }
      });
    };

    const findConsumer = (customerId: string) => {
      const result = dataAssociations.value.find(
        (item: IAssociation) => item.customerId === customerId,
      );
      return result;
    };

    const handleChange = (
      value: string,
      option: {
        value: string;
        label: string;
        item: ICustomer;
      },
    ) => {
      customerSelected.value = option?.item;
      if (option) {
        const result = findConsumer(option.item.id || '');

        if (result) {
          setCustomer(result.products);
          return;
        }
      }

      state.value.selectedRowKeys = [];
      state.value.selectedRow = [];
    };

    const resetVariables = () => {
      customerValue.value = null;
      customerSelected.value = {} as ICustomer;
      state.value.selectedRowKeys = [];
      state.value.selectedRow = [];
      getAll(true);
    };

    const handlerSave = () => {
      const result = findConsumer(customerSelected.value.id || '');

      const payload: IAssociation = {
        id: result ? result.id : '',
        products: state.value.selectedRow,
        customerId: customerSelected.value.id || '',
        customerName: customerSelected?.value.name,
      };

      if (result && result.id) updated(payload, payload.customerName, resetVariables);
      else create(payload, payload.customerName, resetVariables);
    };

    const onSelectChange = (selectedRowKeys: Key[], selectedRow: IProduct[]) => {
      state.value.selectedRowKeys = selectedRowKeys;
      state.value.selectedRow = selectedRow;
    };

    const handlerCancel = () => {
      router.back();
    };

    onMounted(() => {
      getAll();

      getAllCustomers((data: ICustomer[]) => {
        optionsCustomers.value = data.map((item: ICustomer) => ({
          value: item.name,
          label: item.name,
          item,
        }));
        if (id) {
          const result = data.find((item: ICustomer) => item.id === id);
          customerValue.value = result ? result.name : null;
          customerSelected.value = result || ({} as ICustomer);
        }
      });

      getAllProducts((data: IProduct[]) => {
        dataSource.value = data;
      });
    });

    return {
      dataSource,
      optionsCustomers,
      customerSelected,
      customerValue,
      state,
      loading,

      columns: [
        {
          title: 'Nome do Produto',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Ativo',
          dataIndex: 'active',
          key: 'active',
        },
      ],
      handleChange,
      onSelectChange,
      handlerCancel,
      handlerSave,
    };
  },
});
</script>
<style>
.ant-table-wrapper {
  overflow-x: auto;
}

.footer-form-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.ant-card-head {
  text-align: center;
}
.ant-card {
  max-width: 90%;
  margin: 2rem auto;
}
</style>
