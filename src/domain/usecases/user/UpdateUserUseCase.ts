import {Inject, Service} from "typedi";
import {UserRepository} from "../../../infrastructure/repositories/UserRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {User} from "../../entities/User";

@Service()
export class UpdateUserUseCase {
  constructor(
    @Inject(() => UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(id: string, name: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;

    return await this.userRepository.update(user);
  }
}
