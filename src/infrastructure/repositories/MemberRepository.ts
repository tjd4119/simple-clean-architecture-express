import {Inject, Service} from "typedi";
import {DataSource, EntityManager, Repository} from "typeorm";
import {IMemberRepository} from "../../domain/repositories/IMemberRepository";
import {Member} from "../../domain/entities/Member";

@Service()
export class MemberRepository implements IMemberRepository {
  private ormRepository: Repository<Member>;

  constructor(@Inject("DataSource") private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Member);
  }

  async create(member: Member, manager?: EntityManager): Promise<Member> {
    const repository = manager ? manager.getRepository(Member) : this.ormRepository;
    return await repository.save(member);
  }
}
