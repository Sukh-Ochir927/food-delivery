import express from "express";
import { getFoods } from "../controller/foods/get-foods";
import { createFoods } from "../controller/foods/create-foods";
import { updateFoods } from "../controller/foods/update-foods";
import { deleteFoods } from "../controller/foods/delete-foods";

const router = express.Router();

router.get("/", getFoods);
router.post("/", createFoods);
router.put("/:id", updateFoods);
router.delete("/:id", deleteFoods);

export default router;
