import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();
const router = Router();
router.post("/", (req, res) => userController.create(req, res));
router.get("/:id", (req, res) => userController.get(req, res));
router.put("/:id", (req, res) => userController.update(req, res));
router.delete("/:id", (req, res) => userController.delete(req, res));
router.get("/", (req, res) => userController.getAll(req, res));

export default router;
