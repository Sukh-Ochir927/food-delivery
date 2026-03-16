import express from "express";
import { getUsers } from "../controller/users/get-users";
import { createUsers } from "../controller/users/create-user";
import { updateUsers } from "../controller/users/update-user";
import { deleteUsers } from "../controller/users/delete-user";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
