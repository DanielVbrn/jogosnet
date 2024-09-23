import { Router } from "express";
import ProductController from "./controller/product_controller";


const routes = Router()

routes.get("/products", ProductController.getAllProducts);
routes.post('/save-products', ProductController.saveProduct);
routes.delete("/delete-products/:id", ProductController.deleteProduct);
routes.patch("/update-products/:id", ProductController.updateProduct);
routes.get("/products/:nome")

export default routes;