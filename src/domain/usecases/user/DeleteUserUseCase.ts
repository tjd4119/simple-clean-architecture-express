import {Inject, Service} from "typedi";
import {UserRepository} from "../../../infrastructure/repositories/UserRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {UserNotFoundError} from "../../errors/UserNotFoundError";

@Service()
export class DeleteUserUseCase {
  constructor(
    @Inject(() => UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError({"id": id});
    }

    await this.userRepository.delete(id);
  }
}
