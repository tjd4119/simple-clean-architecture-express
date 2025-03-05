import { Inject, Service } from 'typedi';
import { SalesInquiry } from '../../entities/SalesInquiry';
import { SalesInquiryRepository } from '../../../infrastructure/repositories/SalesInquiryRepository';
import { ISalesInquiryRepository } from '../../repositories/ISalesInquiryRepository';
import { isPhoneNumber } from '../../../utils/phoneNumber';
import { isEmail } from '../../../utils/email';
import { FatalError } from '../../errors/FatalError';

@Service()
export class CreateSalesInquiryUseCase {
  constructor(
    @Inject(() => SalesInquiryRepository)
    private salesInquirtRepository: ISalesInquiryRepository
  ) {}

  public async execute(
    organizationName: string,
    contactName: string,
    contactEmail: string,
    contactPhonenumber: string,
    data: string
  ): Promise<SalesInquiry> {
    if (!isEmail(contactEmail)) {
      throw new FatalError('Invalid email');
    }
    if (!isPhoneNumber(contactPhonenumber)) {
      throw new FatalError('Invalid phoneNumber');
    }
    const salesInquiry = new SalesInquiry();
    salesInquiry.organizationName = organizationName;
    salesInquiry.contactName = contactName;
    salesInquiry.contactEmail = contactEmail;
    salesInquiry.contactPhonenumber = contactPhonenumber;
    salesInquiry.data = data;
    return await this.salesInquirtRepository.createSalesInquiry(salesInquiry);
  }
}
