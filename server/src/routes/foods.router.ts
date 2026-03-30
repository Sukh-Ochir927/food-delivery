import express from "express";
import { getFoods } from "../controller/foods/get-foods";
import { createFoods } from "../controller/foods/create-foods";
import { updateFoods } from "../controller/foods/update-foods";

const router = express.Router();

router.get("/", getFoods);
router.post("/", createFoods);
router.put("/:id", updateFoods);

export default router;
