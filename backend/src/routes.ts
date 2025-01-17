import { Router } from "express";
import ProductController from "./controller/product_controller";
import upload from "./middleware/multer";


const routes = Router()

routes.get("/products", ProductController.getAllProducts);
routes.post('/products', ProductController.saveProduct);
routes.delete("/products/:id", ProductController.deleteProduct);
routes.patch("/products/:id", ProductController.updateProduct);
routes.get("/products/:nome", ProductController.getProductByName)

export default routes;