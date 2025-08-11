import { AppDataSource } from "../data_source";
import { Products } from "../entities/Products";
import { redis } from "../cache/redis";

export class ProductService {
  static async getAllProducts(): Promise<{ data: Products[]; fromCache: boolean }> {
    const cached = await redis.get("products");
    if (cached) {
      return { data: JSON.parse(cached), fromCache: true };
    }

    const products = await AppDataSource.getRepository(Products).find();
    await redis.set("products", JSON.stringify(products), "EX", 3600);
    return { data: products, fromCache: false };
  }

  static async getProductByName(nome: string): Promise<{ data: Products | null; fromCache: boolean }> {
    const cacheKey = `product:${nome}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return { data: JSON.parse(cached), fromCache: true };
    }

    const product = await AppDataSource.getRepository(Products).findOneBy({ nome });
    if (!product) return { data: null, fromCache: false };

    await redis.set(cacheKey, JSON.stringify(product), "EX", 3600);
    return { data: product, fromCache: false };
  }

  static async saveProduct(product: Products): Promise<Products> {
    const savedProduct = await AppDataSource.getRepository(Products).save(product);
    await redis.del("products");
    return savedProduct;
  }

  static async saveMultipleProducts(products: Products[]) : Promise<Products[]> {
    const repo = AppDataSource.getRepository(Products);
    const savedProducts = await repo.save(products);

    await redis.del("products");

    return savedProducts;
  }

  static async deleteProduct(id: number): Promise<boolean> {
    const repo = AppDataSource.getRepository(Products);
    const product = await repo.findOneBy({ id });
    if (!product) return false;

    await repo.delete(id);
    await redis.del("products");
    await redis.del(`product:${product.nome}`);
    return true;
  }

  static async updateProduct(id: number, data: Partial<Products>): Promise<boolean> {
    const repo = AppDataSource.getRepository(Products);
    const product = await repo.findOneBy({ id });
    if (!product) return false;

    await repo.update({ id }, data);
    await redis.del("products");
    await redis.del(`product:${product.nome}`);
    return true;
  }
}
