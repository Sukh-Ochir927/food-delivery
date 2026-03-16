import express from "express";
import { getCategories } from "../controller/categories/get-categories";

const router = express.Router();

router.get("/", getCategories);

export default router;
