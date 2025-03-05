import { Service } from 'typedi';

@Service()
export class GetCurrentUTCDateTimeUseCase {
  public async execute(): Promise<string> {
    return new Date().toISOString();
  }
}
