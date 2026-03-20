import express from "express";
import { login } from "../controller/utils/login";

const router = express.Router();
router.post("/", login);

export default router;
