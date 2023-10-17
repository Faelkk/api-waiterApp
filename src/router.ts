import { Router } from "express";
import path from "node:path";
import multer from "multer";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategory } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProducts } from "./app/useCases/products/createProducts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listsOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrders";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { deleteProduct } from "./app/useCases/products/deleteProduct";
import { deleteCategories } from "./app/useCases/categories/deleteCategories";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}--${file.originalname}`);
    },
  }),
});

// list categories
router.get("/categories", listCategories);

// create category
router.post("/categories", createCategory);

// delete categories

router.delete("/categories/:categoryId", deleteCategories);

// list products

router.get("/products", listProducts);

// create product

router.post("/products", upload.single("image"), createProducts);

// get products by category

router.delete("/products/:productId", deleteProduct);

router.get("/categories/:categoryId/products", listProductsByCategory);

// list orders

router.get("/orders", listsOrders);

// create order

router.post("/orders", createOrder);

// change order status

router.patch("/orders/:orderId", changeOrderStatus);

// delete/cancel order

router.delete("/orders/:orderId", cancelOrder);
