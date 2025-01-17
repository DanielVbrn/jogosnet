"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data_source");
const Products_1 = require("../entities/Products");
class ProductController {
}
_a = ProductController;
// Endpoint para obter todos os produtos
ProductController.getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield data_source_1.AppDataSource.getRepository(Products_1.Products).find();
    return res.status(200).json(products);
});
// Endpoint para obter um produto pelo nome
ProductController.getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome } = req.params;
    const products = yield data_source_1.AppDataSource.getRepository(Products_1.Products).findOneBy({ nome });
    return res.status(200).json(products);
});
// Endpoint para salvar um produto (com imagem)
ProductController.saveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productsRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const product = new Products_1.Products();
    // Atribuir nome, descrição e preço
    product.nome = req.body.nome;
    product.descricao = req.body.descricao;
    product.preco = parseFloat(req.body.preco);
    // Salvar o caminho da imagem se foi enviada
    product.imgSrc = req.body.imgSrc; // Define o caminho acessível no frontend
    product.videoSrc = req.body.videoSrc;
    try {
        const savedProduct = yield productsRepository.save(product);
        return res.status(200).json(savedProduct);
    }
    catch (error) {
        console.error("Erro ao salvar o produto", error);
        return res.status(500).json({ message: "Erro ao salvar o produto", error });
    }
});
ProductController.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idProduct = Number(id);
    if (isNaN(idProduct)) {
        return res.status(400).json({ message: "ID inválido" });
    }
    const productsRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const findProduct = yield productsRepository.findOneBy({ id: idProduct });
    if (!findProduct) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }
    yield productsRepository.delete(idProduct);
    return res.status(200).json({ message: "Produto removido" });
});
ProductController.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idProduct = Number(id);
    if (isNaN(idProduct)) {
        return res.status(400).json({ message: "ID inválido" });
    }
    const productsRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    const findProduct = yield productsRepository.findOneBy({ id: idProduct });
    if (!findProduct) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }
    yield productsRepository.update({ id: idProduct }, req.body);
    return res.status(200).json({ message: "Produto atualizado com sucesso" });
});
exports.default = ProductController;
