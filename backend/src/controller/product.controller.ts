import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { Products } from "../entities/Products";

export default class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      console.log(products.fromCache ? "Retornando cache de produtos" : "Consultando banco e salvando no cache");
      return res.status(200).json(products.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async getProductByName(req: Request, res: Response) {
    const { nome } = req.params;
    try {
      const product = await ProductService.getProductByName(nome);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      console.log(product.fromCache ? `🔄 Produto ${nome} retornado do cache` : `🆕 Produto ${nome} salvo no cache`);
      return res.status(200).json(product.data);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async saveProduct(req: Request, res: Response) {
    try {
      const newProduct = new Products();
      newProduct.nome = req.body.nome;
      newProduct.descricao = req.body.descricao;
      newProduct.preco = parseFloat(req.body.preco);
      newProduct.imgSrc = req.body.imgSrc;
      newProduct.videoSrc = req.body.videoSrc;

      const savedProduct = await ProductService.saveProduct(newProduct);

      console.log("Cache de produtos limpo após inserção");
      return res.status(200).json(savedProduct);
    } catch (error) {
      console.error("Erro ao salvar o produto", error);
      return res.status(500).json({ message: "Erro ao salvar o produto" });
    }
  }

  static async seedProducts(req: Request, res: Response) {
    try {
      const productsData: Products[] = req.body;

      if (!Array.isArray(productsData) || productsData.length === 0) {
        return res.status(400).json({ message: "Envie um array de produtos" });
      }

      const newProducts = productsData.map((data) => {
        const p = new Products();
        p.nome = data.nome
        p.descricao = data.descricao;
        p.preco = parseFloat(String(data.preco));
        p.imgSrc = data.imgSrc;
        p.videoSrc = data.videoSrc;
        return p;
      })

      const savedProducts = await ProductService.saveMultipleProducts(newProducts);

      return res.status(201).json({
        message: `${savedProducts.length} produtos adicionados com sucesso`,
        produtos: savedProducts
      });

    } catch (error) {
      console.error("Erro ao popular o banco", error);
      return res.status(500).json({ message: "Erro ao popular o banco" });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const idProduct = Number(id);

    if (isNaN(idProduct)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    try {
      const deleted = await ProductService.deleteProduct(idProduct);

      if (!deleted) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      console.log("Cache de produtos atualizado após remoção");
      return res.status(200).json({ message: "Produto removido" });
    } catch (error) {
      console.error("Erro ao deletar produto", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const idProduct = Number(id);

    if (isNaN(idProduct)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    try {
      const updated = await ProductService.updateProduct(idProduct, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      console.log("Cache de produtos atualizado após edição");
      return res.status(200).json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar produto", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }
}
