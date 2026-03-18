import express from "express";
import { createOrder } from "../controller/orders/create-order";

const router = express.Router();
router.post("/", createOrder);

export default router;
