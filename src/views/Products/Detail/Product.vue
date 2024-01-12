<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <a-card title="Cadastro de Produtos" :bordered="false">
    <a-row>
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 12, offset: 6 }">
        <a-form @finish="submitForm" :model="formState">
          <a-form-item
            data-cy="form-name"
            label="Nome do produto"
            name="name"
            :rules="[{ required: true, message: 'Campo nome do produto é obrigatório!' }]"
          >
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item class="flex" label="Produto ativo?">
            <a-switch
              data-cy="form-active"
              class="gap-5 left-3"
              v-model:checked="formState.active"
              checked-children="Sim"
              un-checked-children="Não"
            />
          </a-form-item>
          <a-form-item>
            <div class="flex justify-items-center w-full footer-form-container">
              <a-button type="primary" data-cy="btn-product-create" htmlType="submit">
                {{ productId ? 'Editar' : 'Criar' }}
              </a-button>
              <a-button
                style="margin-left: 10px"
                data-cy="btn-product-cancel"
                @click="handlerCancel"
                >Cancelar</a-button
              >
            </div>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { IProduct } from '@/services';
import useProducts from '@/hooks/useProducts';
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import { useRoute } from 'vue-router';

interface FormState {
  id?: string;
  name: string;
  active: boolean;
}

export default defineComponent({
  name: 'ProductDetail',
  setup() {
    const route = useRoute();
    const { id } = route.params;

    const { createProduct, updateProduct, getProductById } = useProducts();

    const formState = ref<FormState>({
      id: '',
      name: '',
      active: false,
    });

    const handlerCancel = () => {
      router.back();
    };

    const submitForm = () => {
      const payload = {
        id: formState.value.id,
        name: formState.value.name,
        active: formState.value.active,
      };

      if (!id) {
        createProduct(payload, () => {
          formState.value.name = '';
          formState.value.active = false;
        });
      } else {
        updateProduct(payload, () => {
          formState.value.name = '';
          formState.value.active = false;
        });
      }
    };

    onMounted(() => {
      if (id) {
        getProductById(id, (data: IProduct) => {
          formState.value = data;
        });
      }
    });

    return {
      productId: id,
      options: [
        {
          value: 'sim',
          label: 'Sim',
        },
        {
          value: 'não',
          label: 'Não',
        },
      ],
      formState,
      submitForm,
      handlerCancel,
    };
  },
});
</script>

<style>
.ant-form-item-control-input-content {
  display: flex;
}

.footer-form-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.ant-form-item-explain-error {
  text-align: justify;
  margin: 0 12px;
}

.ant-card {
  max-width: 90%;
  margin: 2rem auto;
}

.ant-card-head {
  text-align: center;
}

label {
  min-width: 125px;
  margin-right: 1rem;
}
</style>
