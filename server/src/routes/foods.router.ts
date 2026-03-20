import express from "express";
import { getFoods } from "../controller/foods/get-foods";
import { createFoods } from "../controller/foods/create-foods";

const router = express.Router();

router.get("/", getFoods);
router.post("/", createFoods);

export default router;
