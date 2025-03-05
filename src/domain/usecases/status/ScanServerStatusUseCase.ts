import { Service } from 'typedi';

@Service()
export class ScanServerStatusUseCase {
  public async execute(): Promise<Object> {
    return { status: 'online' };
  }
}
