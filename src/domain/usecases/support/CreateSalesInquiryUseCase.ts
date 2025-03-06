import { Inject, Service } from 'typedi';
import { SalesInquiry } from '../../entities/SalesInquiry';
import { SalesInquiryRepository } from '../../../infrastructure/repositories/SalesInquiryRepository';
import { ISalesInquiryRepository } from '../../repositories/ISalesInquiryRepository';
import {
  SalesInquiryRequest,
} from '../../../interface/validators/SalesInquiryValidator';

@Service()
export class CreateSalesInquiryUseCase {
  constructor(
    @Inject(() => SalesInquiryRepository)
    private salesInquirtRepository: ISalesInquiryRepository
  ) {}

  public async execute(requestDTO: SalesInquiryRequest): Promise<SalesInquiry> {
    const salesInquiry = new SalesInquiry();
    salesInquiry.organizationName = requestDTO.organizationName;
    salesInquiry.contactName = requestDTO.contactName;
    salesInquiry.contactEmail = requestDTO.contactEmail;
    salesInquiry.contactPhonenumber = requestDTO.contactPhonenumber;
    salesInquiry.data = requestDTO.data;
    return await this.salesInquirtRepository.createSalesInquiry(salesInquiry);
  }
}
