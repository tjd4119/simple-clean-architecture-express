import {Request, Response} from "express";
import {Container} from "typedi";
import logger from "../../utils/logger";
import {InviteToGroupUseCase} from "../../domain/usecases/group/InviteToGroupUseCase";

export class GroupController {
  async inviteToGroup(req: Request, res: Response) {
    const inviteToGroupUseCase = Container.get(InviteToGroupUseCase);

    const { id } = req.params;
    const { userId } = req.body;
    const groupId = parseInt(id);
    await inviteToGroupUseCase.execute(groupId, userId);

    logger.debug(`Invited to group: ${groupId}`);
    res.status(200).send();
  }
}
