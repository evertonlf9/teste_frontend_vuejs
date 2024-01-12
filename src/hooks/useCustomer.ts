import router from '@/router';
import Services, { ICustomer } from '@/services';
import { notification } from 'ant-design-vue';
import { ref } from 'vue';

export default function useCustomer() {
  const pageRequest = ref({ loading: false });

  const getAllCustomers = (callback: (data: ICustomer[]) => void) => {
    pageRequest.value.loading = true;
    Services.getCustomers()
      .then(({ data }: { data: ICustomer[] }) => {
        pageRequest.value.loading = false;
        callback(data);
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const updateActiveCustomers = (payload: ICustomer, callback: () => void) => {
    pageRequest.value.loading = true;
    Services.putCustomers(payload)
      .then(() => {
        pageRequest.value.loading = false;
        callback();
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const createCustomer = (payload: ICustomer, callback: () => void) => {
    pageRequest.value.loading = true;
    Services.postCustomers(payload)
      .then(() => {
        notification.open({
          message: 'Novo cliente criado sucesso!',
          description: '',
          style: {
            width: '600px',
            marginLeft: `${335 - 600}px`,
          },
          class: 'notification-custom-class',
        });
        callback();
        pageRequest.value.loading = false;
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const updateCustomer = (payload: ICustomer, callback: () => void) => {
    pageRequest.value.loading = true;
    Services.putCustomers(payload)
      .then(() => {
        notification.open({
          message: 'Os dados do cliente froam atualizados com sucesso!',
          description: '',
          style: {
            width: '600px',
            marginLeft: `${335 - 600}px`,
          },
          class: 'notification-custom-class',
        });
        callback();
        pageRequest.value.loading = false;
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const routerEditPage = (id: string) => {
    router.push(`/editar-cliente/${id}`);
  };

  const routerAssocientePage = (id: string) => {
    router.push(`/associar-produtos/${id}`);
  };

  return {
    getAllCustomers,
    updateActiveCustomers,
    routerEditPage,
    routerAssocientePage,
    createCustomer,
    updateCustomer,
    loading: pageRequest.value.loading,
  };
}
