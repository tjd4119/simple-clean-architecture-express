import {Inject, Service} from "typedi";
import {UserRepository} from "../../../infrastructure/repositories/UserRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {UserNotFoundError} from "../../errors/UserNotFoundError";
import {User} from "../../entities/User";

@Service()
export class GetUserUseCase {
  constructor(
    @Inject(() => UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError({"id": id});
    }

    return user;
  }
}
