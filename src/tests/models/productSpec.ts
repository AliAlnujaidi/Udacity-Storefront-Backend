import { Product, IProduct } from '../../models/product';

const product = new Product();

describe('Product Model', () => {
  beforeAll(async () => {
    const productData: IProduct = {
      name: 'beforeall',
      price: 1,
    };
    const productData2: IProduct = {
      name: 'update',
      price: 1,
    };
    await product.createProduct(productData);
    await product.createProduct(productData2);
  });

  it('should have an index method', async () => {
    const result = await product.selectAll();
    expect(result).toBeDefined();
  });

  it('should have a show method', async () => {
    const result = await product.selectById(1);
    expect(result).toEqual({
      id: 1,
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
      id: 3,
      name: 'test',
      price: 1,
    });
  });

  it('should have an update method and return the updated product', async () => {
    const productData: IProduct = {
      name: 'update',
      price: 77,
    };
    const result = await product.update(2, productData);
    expect(result).toEqual({
      id: 2,
      name: 'update',
      price: 77,
    });
  });

  it('should have a delete method and return the deleted product', async () => {
    const result = await product.delete(1);
    expect(result).toEqual({
      id: 1,
      name: 'beforeall',
      price: 1,
    });
  });
});
