import {Inject, Service} from "typedi";
import {Invitation, InvitationStatus} from "../../domain/entities/Invitation";
import {DataSource, EntityManager, Repository} from "typeorm";
import {IInvitationRepository} from "../../domain/repositories/IInvitationRepository";

@Service()
export class InvitationRepository implements IInvitationRepository {
  private ormRepository: Repository<Invitation>;

  constructor(@Inject("DataSource") private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Invitation);
  }

  async create(invitation: Invitation): Promise<Invitation> {
    return await this.ormRepository.save(invitation);
  }

  async findById(id: number): Promise<Invitation | null> {
    return (await this.ormRepository.findOne({
      where: { id },
      relations: ["group", "user"],
    })) || null;
  }

  async update(invitation: Invitation, manager?: EntityManager): Promise<Invitation> {
    const repository = manager ? manager.getRepository(Invitation) : this.ormRepository;
    return await repository.save(invitation);
  }

  async findAllByUserIdAndStatus(userId: string, status: InvitationStatus): Promise<Invitation[]> {
    return await this.ormRepository.find({
      where: {
        user: { id: userId },
        status: status,
      },
    });
  }
}
