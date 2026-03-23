import express from "express";
import { createOrder } from "../controller/orders/create-order";
import { updateOrders } from "../controller/orders/update-orders";
import { getOrders } from "../controller/orders/get-orders";
import { authMiddleWare } from "../middleware/auth-middleware";
import { admindMiddleWare } from "../middleware/admin-middleware";

const router = express.Router();
router.post("/", authMiddleWare, createOrder);
router.put("/:id", updateOrders);
router.get("/", authMiddleWare, admindMiddleWare, getOrders);

export default router;
