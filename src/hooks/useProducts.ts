import Services, { IProduct } from '@/services';
import { notification } from 'ant-design-vue';

export default function useProducts() {
  const getAllProducts = (callback: (data: IProduct[]) => void) => {
    Services.getProducts()
      .then(({ data }: { data: IProduct[] }) => {
        callback(data);
      })
      // eslint-disable-next-line arrow-parens
      .catch(error => console.log(error));
  };

  const updateStatusProduct = (row: IProduct, callback: () => void) => {
    const newRow = row;
    newRow.active = !row.active;
    Services.putProducts(newRow)
      .then(() => {
        callback();
      })
      // eslint-disable-next-line arrow-parens
      .catch(error => {
        console.log(error);
      });
  };

  const createProduct = (payload: IProduct, callback: () => void) => {
    Services.postProducts(payload)
      .then(() => {
        notification.open({
          message: 'Novo produto criado sucesso!',
          description: '',
          style: {
            width: '600px',
            marginLeft: `${335 - 600}px`,
          },
          class: 'notification-custom-class',
        });
        callback();
      })
      // eslint-disable-next-line arrow-parens
      .catch(error => console.log(error));
  };

  const updateProduct = (payload: IProduct, callback: () => void) => {
    Services.putProducts(payload)
      .then(() => {
        notification.open({
          message: 'Os dados do produto foram atualizado com sucesso!',
          description: '',
          style: {
            width: '600px',
            marginLeft: `${335 - 600}px`,
          },
          class: 'notification-custom-class',
        });
        callback();
      })
      // eslint-disable-next-line arrow-parens
      .catch(error => console.log(error));
  };

  const getProductById = (id: string | string[], callback: (data: IProduct) => void) => {
    Services.getProductById(id)
      .then(({ data }: { data: IProduct }) => {
        callback(data);
      })
    // eslint-disable-next-line arrow-parens
      .catch(error => console.log(error));
  };

  return {
    getAllProducts,
    updateStatusProduct,
    updateProduct,
    createProduct,
    getProductById,
  };
}
