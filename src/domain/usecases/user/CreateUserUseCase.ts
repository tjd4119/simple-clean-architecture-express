import {Inject, Service} from "typedi";
import {UserRepository} from "../../../infrastructure/repositories/UserRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {User} from "../../entities/User";

@Service()
export class CreateUserUseCase {
  constructor(
    @Inject(() => UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(name: string, email: string): Promise<User> {
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;

    return await this.userRepository.create(newUser);
  }
}
