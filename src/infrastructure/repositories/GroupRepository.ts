import {Inject, Service} from "typedi";
import {IGroupRepository} from "../../domain/repositories/IGroupRepository";
import {Group} from "../../domain/entities/Group";
import {DataSource, Repository} from "typeorm";

@Service()
export class GroupRepository implements IGroupRepository {
  private ormRepository: Repository<Group>;

  constructor(@Inject("DataSource") private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Group);
  }

  async create(group: Group): Promise<Group> {
    return await this.ormRepository.save(group);
  }

  async findById(id: number): Promise<Group | null> {
    return (await this.ormRepository.findOne({
      where: { id },
    })) || null;
  }
}
