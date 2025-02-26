import {Inject, Service} from "typedi";
import { Repository, DataSource } from "typeorm";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

@Service()
export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(@Inject("DataSource") private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(User);
  }

  async create(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return (await this.ormRepository.findOne({
      where: { id },
    })) || null;
  }

  async findAll(): Promise<User[]> {
    return await this.ormRepository.find();
  }

  async update(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
