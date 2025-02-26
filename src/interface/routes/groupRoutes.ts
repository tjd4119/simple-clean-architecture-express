import { Router } from "express";
import {GroupController} from "../controllers/GroupController";

const groupController = new GroupController();
const router = Router();
router.post("/:id/invite", (req, res) => groupController.inviteToGroup(req, res));

export default router;
