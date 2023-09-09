import { Product, IProduct } from '../../models/product';

const product = new Product();

describe('Product Model', () => {
  let mainProduct: IProduct;
  let updateProduct: IProduct;
  let deleteProduct: IProduct;
  beforeAll(async () => {
    const productData: IProduct = {
      name: 'beforeall',
      price: 1,
    };
    const productData2: IProduct = {
      name: 'update',
      price: 1,
    };
    const productData3: IProduct = {
      name: 'delete',
      price: 1,
    };

    mainProduct = await product.createProduct(productData);
    updateProduct = await product.createProduct(productData2);
    deleteProduct = await product.createProduct(productData3);
  });

  it('should have an index method', async () => {
    const result = await product.selectAll();
    expect(result).toBeDefined();
  });

  it('should have a show method', async () => {
    const result = await product.selectById(mainProduct.id || 0);
    expect(result).toEqual({
      id: mainProduct.id,
      name: 'beforeall',
      price: 1,
    });
  });

  it('should have a create method and return a product when created', async () => {
    const productData: IProduct = {
      name: 'test',
      price: 1,
    };
    const result = await product.createProduct(productData);
    expect(result).toEqual({
      id: result.id,
      name: 'test',
      price: 1,
    });
  });

  it('should have an update method and return the updated product', async () => {
    const productData: IProduct = {
      name: 'update',
      price: 77,
    };
    const result = await product.update(updateProduct.id || 0, productData);
    expect(result).toEqual({
      id: result.id,
      name: 'update',
      price: 77,
    });
  });

  it('should have a delete method and return the deleted product', async () => {
    const result = await product.delete(deleteProduct.id || 0);
    expect(result).toEqual({
      id: deleteProduct.id,
      name: 'delete',
      price: 1,
    });
  });
});
