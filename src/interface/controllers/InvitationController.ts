import {Request, Response} from "express";
import {Container} from "typedi";
import {AcceptInvitationUseCase} from "../../domain/usecases/invitation/AcceptInvitationUseCase";
import logger from "../../utils/logger";
import {RejectInvitationUseCase} from "../../domain/usecases/invitation/RejectInvitationUseCase";

export class InvitationController {
  async acceptInvitation(req: Request, res: Response) {
    const acceptInvitationUseCase = Container.get(AcceptInvitationUseCase);

    const { id } = req.params;
    const invitationId = parseInt(id);
    const invitation = await acceptInvitationUseCase.execute(invitationId);

    logger.debug(`Invitation accepted: ${invitation}`);
    res.status(200).send();
  }

  async rejectInvitation(req: Request, res: Response) {
    const rejectInvitationUseCase = Container.get(RejectInvitationUseCase);

    const { id } = req.params;
    const invitationId = parseInt(id);
    const invitation = await rejectInvitationUseCase.execute(invitationId);

    logger.debug(`Invitation rejected: ${invitation}`);
    res.status(200).send();
  }
}
