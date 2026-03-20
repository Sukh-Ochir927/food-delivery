import express from "express";
import { getCategories } from "../controller/categories/get-categories";
import { createCategories } from "../controller/categories/create-categories";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategories);

export default router;
