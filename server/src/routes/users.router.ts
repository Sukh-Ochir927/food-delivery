import express from "express";
import { createUsers } from "../controller/users/create-user";
import { updateUsers } from "../controller/users/update-user";
import { deleteUsers } from "../controller/users/delete-user";
import { getUsers } from "../controller/users/get-users";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
