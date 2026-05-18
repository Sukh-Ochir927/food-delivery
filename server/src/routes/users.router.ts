import express from "express";
import { createUsers } from "../controller/users/create-user";
import { updateUsers } from "../controller/users/update-user";
import { deleteUsers } from "../controller/users/delete-user";
import { getUsers } from "../controller/users/get-users";
import { getMe } from "../controller/users/get-me";
import { authMiddleWare } from "../middleware/auth-middleware";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", authMiddleWare, getMe);
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
