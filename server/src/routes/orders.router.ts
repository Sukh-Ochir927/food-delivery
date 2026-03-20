import express from "express";
import { createOrder } from "../controller/orders/create-order";
import { updateOrders } from "../controller/orders/update-orders";

const router = express.Router();
router.post("/", createOrder);
router.put("/:id", updateOrders);

export default router;
