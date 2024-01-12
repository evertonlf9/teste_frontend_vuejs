import Services, { ICustomer, IProduct, IAssociation } from '@/services';
import { notification } from 'ant-design-vue';
import { ref } from 'vue';

export default function useAssociation() {
  const pageRequest = ref({ loading: false });

  const getAllCustomers = (callback: (data: ICustomer[]) => void) => {
    pageRequest.value.loading = true;
    Services.getCustomers()
      .then(({ data }: { data: ICustomer[] }) => {
        callback(data);
        pageRequest.value.loading = false;
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const getAllProducts = (callback: (data: IProduct[]) => void) => {
    pageRequest.value.loading = true;
    Services.getProducts()
      .then(({ data }: { data: IProduct[] }) => {
        callback(data);
        pageRequest.value.loading = false;
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const getAllAssociations = (callback: (data: IAssociation[]) => void) => {
    pageRequest.value.loading = true;
    Services.getAssociations()
      .then(({ data }: { data: IAssociation[] }) => {
        callback(data);
        pageRequest.value.loading = false;
      })
      .catch((error) => {
        console.log(error);
        pageRequest.value.loading = false;
      });
  };

  const create = (payload: IAssociation, clienteName: string, callback: () => void) => {
    pageRequest.value.loading = true;
    Services.postAssociation(payload)
      .then(() => {
        notification.open({
          message: 'Associação feita com sucesso!',
          description: `Os produtos selecionados foram associados ao cliente ${clienteName}.`,
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

  const updated = (payload: IAssociation, clienteName: string, callback: () => void) => {
    pageRequest.value.loading = true;
    Services.putAssociation(payload)
      .then(() => {
        notification.open({
          message: 'Associação feita com sucesso!',
          description: `Os produtos selecionados foram associados ao cliente ${clienteName}.`,
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

  return {
    getAllCustomers,
    getAllAssociations,
    getAllProducts,
    create,
    updated,
    loading: pageRequest.value.loading,
  };
}
