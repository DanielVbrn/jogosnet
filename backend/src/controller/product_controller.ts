// Import multer
import multer from "multer";
import { Request, Response } from "express";
import { AppDataSource } from "../data_source";
import { Products } from "../entities/Products";


export default class ProductController {
    // Endpoint para obter todos os produtos
    static getAllProducts = async (req: Request, res: Response) => {
        const products = await AppDataSource.getRepository(Products).find();
        return res.status(200   ).json(products);
    };

    // Endpoint para obter um produto pelo nome
    static getProductByName = async (req: Request, res: Response) => {
        const { nome } = req.params;
        const products = await AppDataSource.getRepository(Products).findOneBy({ nome });
        return res.status(200).json(products);
    };

    // Endpoint para salvar um produto (com imagem)
    static saveProduct = async (req: Request, res: Response) => {
        const productsRepository = AppDataSource.getRepository(Products);
        const product = new Products();

        // Atribuir nome, descrição e preço
        product.nome = req.body.nome;
        product.descricao = req.body.descricao;
        product.preco = parseFloat(req.body.preco);

        // Salvar o caminho da imagem se foi enviada
        product.imgSrc = req.body.imgSrc; // Define o caminho acessível no frontend
        product.videoSrc = req.body.videoSrc;

        try {
            const savedProduct = await productsRepository.save(product);
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
    
        return res.status(200).json({ message: "Produto removido" });
    }
    
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
    
        return res.status(200).json({ message: "Produto atualizado com sucesso" });
    }
    
    
}

