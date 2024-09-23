import axios from "axios"
import { Request, Response } from "express"
import api from "../api"
import { AppDataSource } from "../data_source"
import {Products} from "../entities/Products"


export default class ProductController {
    static getAllProducts = async (req:Request, res: Response) => {
        const products = await AppDataSource.getRepository(Products).find();

        return res.json(products).status(200);
    }

    static getProductByName = async (req:Request, res: Response) => {
        const {nome} = req.params;
        const productsRepository = AppDataSource.getRepository(Products);
        

        
        const products = await AppDataSource.getRepository(Products).findOneBy({nome});


        return res.json(products).status(200);
    }

    static saveProduct = async (req:Request, res: Response) => {
        const productsRepository = AppDataSource.getRepository(Products);
        
        const product = new Products();
        product.nome = req.body.nome
        product.descricao = req.body.descricao
        product.preco = req.body.preco
        const savedProduct = await productsRepository.save(product);
        
        return res.json(savedProduct).status(200);
    }

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

