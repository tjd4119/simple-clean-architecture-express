import { Request, Response } from 'express';
import {Container} from "typedi";
import {CreateUserUseCase} from "../../domain/usecases/user/CreateUserUseCase";
import logger from "../../utils/logger";
import {GetUserUseCase} from "../../domain/usecases/user/GetUserUseCase";
import {DeleteUserUseCase} from "../../domain/usecases/user/DeleteUserUseCase";
import {plainToInstance} from "class-transformer";
import {UserDTO} from "../dto/UserDTO";
import {UpdateUserUseCase} from "../../domain/usecases/user/UpdateUserUseCase";
import {GetAllUsersUseCase} from "../../domain/usecases/user/GetAllUsersUseCase";

export class UserController {
  async create(req: Request, res: Response) {
    const createUserUseCase = Container.get(CreateUserUseCase);

    const { name, email } = req.body;
    const user = await createUserUseCase.execute(name, email);

    logger.debug(`User created: ${user}`);
    res.status(201).json(user);
  }

  async getAll(req: Request, res: Response) {
    const useCase = Container.get(GetAllUsersUseCase);

    const users = await useCase.execute();
    const usersDto = users.map((user) => plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    }));
    logger.debug(`Users found: ${usersDto}`);

    res.json(usersDto);
  }

  async get(req: Request, res: Response) {
    const useCase = Container.get(GetUserUseCase);

    const { id } = req.params;
    const user = await useCase.execute(id);
    const userDto = plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
    logger.debug(`User found: ${userDto}`);

    res.json(userDto);
  }

  async update(req: Request, res: Response) {
    const useCase = Container.get(UpdateUserUseCase);
    const { id } = req.params;
    const { name } = req.body;

    const newUser = await useCase.execute(id, name);

    const userDto = plainToInstance(UserDTO, newUser, {
      excludeExtraneousValues: true,
    });

    logger.debug(`User updated: ${userDto}`);

    res.json(userDto);
  }

  async delete(req: Request, res: Response) {
    const useCase = Container.get(DeleteUserUseCase);

    const { id } = req.params;
    await useCase.execute(id);

    logger.debug(`User deleted: ${id}`);
    res.status(204).send();
  }
}
