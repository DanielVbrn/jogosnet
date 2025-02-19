// Import multer
import multer from "multer";
import { Request, Response } from "express";
import { AppDataSource } from "../data_source";
import { Products } from "../entities/Products";
import { config } from "../config/config";
import Redis from "ioredis";


const redis = new Redis(config.databaseUrl);

export default class ProductController {
    static getAllProducts = async (req: Request, res: Response) => {
        try {
            const cachedProducts = await redis.get("products");

            if (cachedProducts) {
                console.log("Retornando Cache de Produtos");
                return res.status(200).json(JSON.parse(cachedProducts));
            }

            const products = await AppDataSource.getRepository(Products).find();

            await redis.set("products", JSON.stringify(products), "EX", 3600); 

            console.log("🆕 Consultando banco e salvando no cache");
            return res.status(200).json(products);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    };

    static getProductByName = async (req: Request, res: Response) => {
        const { nome } = req.params;
        const cacheKey = `product:${nome}`;

        try {
            const cachedProduct = await redis.get(cacheKey);

            if (cachedProduct) {
                console.log(`🔄 Produto ${nome} retornado do cache`);
                return res.status(200).json(JSON.parse(cachedProduct));
            }

            const product = await AppDataSource.getRepository(Products).findOneBy({ nome });

            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            await redis.set(cacheKey, JSON.stringify(product), "EX", 3600);

            console.log(`🆕 Produto ${nome} salvo no cache`);
            return res.status(200).json(product);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    };

    static saveProduct = async (req: Request, res: Response) => {
        const productsRepository = AppDataSource.getRepository(Products);
        const product = new Products();

        product.nome = req.body.nome;
        product.descricao = req.body.descricao;
        product.preco = parseFloat(req.body.preco);
        product.imgSrc = req.body.imgSrc;
        product.videoSrc = req.body.videoSrc;

        try {
            const savedProduct = await productsRepository.save(product);

            await redis.del("products");

            console.log("🗑️ Cache de produtos limpo após inserção");
            return res.status(200).json(savedProduct);
        } catch (error) {
            console.error("Erro ao salvar o produto", error);
            return res.status(500).json({ message: "Erro ao salvar o produto", error });
        }
    };


    static deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const idProduct = Number(id);

        if (isNaN(idProduct)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const productsRepository = AppDataSource.getRepository(Products);
        const findProduct = await productsRepository.findOneBy({ id: idProduct });

        if (!findProduct) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        await productsRepository.delete(idProduct);

        // Limpar cache geral e específico do produto
        await redis.del("products");
        await redis.del(`product:${findProduct.nome}`);

        console.log("🗑️ Cache de produtos atualizado após remoção");
        return res.status(200).json({ message: "Produto removido" });
    };

    
    static updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const idProduct = Number(id);

        if (isNaN(idProduct)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const productsRepository = AppDataSource.getRepository(Products);
        const findProduct = await productsRepository.findOneBy({ id: idProduct });

        if (!findProduct) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        await productsRepository.update({ id: idProduct }, req.body);

        await redis.del("products");
        await redis.del(`product:${findProduct.nome}`);

        console.log("🗑️ Cache de produtos atualizado após edição");
        return res.status(200).json({ message: "Produto atualizado com sucesso" });
    };

    
    
}

