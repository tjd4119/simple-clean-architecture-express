import { Inject, Service } from 'typedi';
import { ISalesInquiryRepository } from '../../domain/repositories/ISalesInquiryRepository';
import { SalesInquiry } from '../../domain/entities/SalesInquiry';
import { DataSource, Repository } from 'typeorm';
import logger from '../../utils/logger';

@Service()
export class SalesInquiryRepository implements ISalesInquiryRepository {
  private ormRepository: Repository<SalesInquiry>;

  constructor(@Inject('DataSource') private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(SalesInquiry);
  }

  async createSalesInquiry(sales_inquiry: SalesInquiry): Promise<SalesInquiry> {
    return await this.ormRepository.save(sales_inquiry);
  }
  async getSalesInquiry(salesInquiryId: number): Promise<SalesInquiry | null> {
    return await this.ormRepository.findOne({
      where: { salesInquiryId: salesInquiryId },
    });
  }
  async updateSalesInquiry(sales_inquiry: SalesInquiry): Promise<SalesInquiry> {
    return await this.ormRepository.save(sales_inquiry);
  }
  async deleteSalesInquiry(salesInquiryId: number): Promise<void> {
    await this.ormRepository.delete(salesInquiryId);
  }
}
