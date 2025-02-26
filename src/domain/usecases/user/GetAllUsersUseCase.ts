import {Inject, Service} from "typedi";
import {UserRepository} from "../../../infrastructure/repositories/UserRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {User} from "../../entities/User";

@Service()
export class GetAllUsersUseCase {
  constructor(
    @Inject(() => UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
