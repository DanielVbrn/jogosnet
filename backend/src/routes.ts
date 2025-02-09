import { Router } from "express";
import ProductController from "./controller/product_controller";
import upload from "./middleware/multer";

const routes = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     description: Obtém a lista completa de produtos cadastrados.
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 */
routes.get("/products", ProductController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     description: Adiciona um novo produto ao banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Erro ao criar produto.
 */
routes.post("/products", ProductController.saveProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     description: Remove um produto do banco de dados pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
routes.delete("/products/:id", ProductController.deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Atualiza um produto
 *     description: Modifica os dados de um produto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
routes.patch("/products/:id", ProductController.updateProduct);

/**
 * @swagger
 * /products/{nome}:
 *   get:
 *     summary: Busca um produto pelo nome
 *     description: Retorna os detalhes de um produto específico pelo nome.
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
routes.get("/products/:nome", ProductController.getProductByName);

export default routes;
