<!-- eslint-disable arrow-parens -->
<template>
  <a-card title="Cadastro de Cliente" :bordered="false">
    <a-row class="flex justify-center">
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 12, offset: 6 }">
        <a-form @finish="submitForm" :model="formState">
          <a-form-item
            label="Nome do Cliente"
            name="name"
            :rules="[{ required: true, message: 'Campo nome do cliente é obrigatório!' }]"
          >
            <a-input
              data-cy="form-name"
              v-model:value="formState.name"
              placeholder="Digite seu nome"
              maxLenght="120"
            />
          </a-form-item>
          <a-form-item
            label="Documento"
            name="document"
            :rules="[{ required: true, message: 'Campo documento é obrigatório!' }]"
          >
            <a-input
              data-cy="form-document"
              v-model:value="formState.document"
              placeholder="Digite seu documento"
            />
          </a-form-item>
          <a-form-item label="Telefone">
            <a-input
              data-cy="form-phone"
              v-model:value="formState.phone"
              placeholder="Digite seu telefone"
              maxLenght="14"
            />
          </a-form-item>
          <a-form-item label="E-mail">
            <a-input
              data-cy="form-email"
              v-model:value="formState.email"
              maxLenght="140"
              placeholder="Digite seu e-mail"
              type="email"
            />
          </a-form-item>
          <a-form-item label="Cliente ativo?">
            <a-switch
              data-cy="form-active"
              v-model:checked="formState.active"
              checked-children="Sim"
              un-checked-children="Não"
            />
          </a-form-item>
          <a-form-item>
            <div class="flex justify-items-center w-full footer-form-container">
              <a-button type="primary" htmlType="submit" data-cy="btn-customer-create">
                {{ consumerId ? 'Editar' : 'Criar' }}
              </a-button>
              <a-button
                style="margin-left: 10px"
                data-cy="btn-customer-cancel"
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
import { onMounted, ref } from 'vue';
import Services, { ICustomer } from '@/services';
import { useRoute } from 'vue-router';
// eslint-disable-next-line import/no-cycle
import useCustomer from '@/hooks/useCustomer';
// eslint-disable-next-line import/no-cycle
import router from '@/router';

interface FormState {
  name: string;
  document: string;
  phone: string;
  email: string;
  active: boolean;
}

export default {
  name: 'CustomerView',
  setup() {
    const route = useRoute();
    const { id } = route.params;

    const { createCustomer, updateCustomer } = useCustomer();

    const initialValues = {
      name: '',
      document: '',
      phone: '',
      email: '',
      active: false,
    };

    const formState = ref<FormState>(initialValues);

    const handlerCancel = () => {
      router.back();
    };

    onMounted(() => {
      if (id) {
        Services.getCustomerById(id)
          .then(({ data }: { data: ICustomer }) => {
            formState.value = data;
          })
          // eslint-disable-next-line arrow-parens
          .catch(error => console.log(error));
      }
    });

    const submitForm = () => {
      if (!id) {
        createCustomer(formState.value, () => {
          formState.value = initialValues;
        });
      } else {
        updateCustomer(formState.value, () => {
          formState.value = initialValues;
        });
      }
    };
    return {
      consumerId: id,
      formState,
      submitForm,
      handlerCancel,
    };
  },
};
</script>

<style>
.ant-form-item-explain-error {
  text-align: justify;
  margin: 0 12px;
}

.footer-form-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.ant-form-item-control-input-content {
  display: flex;
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
