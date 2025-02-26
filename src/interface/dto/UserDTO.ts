import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  // Note: deletedAt should be hidden when plainToInstance performed
  // @Expose()
  deletedAt: Date | null;
}
