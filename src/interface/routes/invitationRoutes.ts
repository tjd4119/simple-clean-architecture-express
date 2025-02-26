import { Router } from "express";
import {InvitationController} from "../controllers/InvitationController";

const invitationController = new InvitationController();
const router = Router();
router.post("/:id/accept", (req, res) => invitationController.acceptInvitation(req, res));
router.post("/:id/reject", (req, res) => invitationController.rejectInvitation(req, res));

export default router;
