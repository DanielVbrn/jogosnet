import { Router } from "express";
import ProductController from "./controller/product_controller";
import upload from "./middleware/multer";


const routes = Router()

routes.get("/products", ProductController.getAllProducts);
routes.post('/products', upload.single('images'), ProductController.saveProduct);
routes.delete("/delete-products/:id", ProductController.deleteProduct);
routes.patch("/update-products/:id", ProductController.updateProduct);
routes.get("/products/:nome", ProductController.getProductByName)

export default routes;