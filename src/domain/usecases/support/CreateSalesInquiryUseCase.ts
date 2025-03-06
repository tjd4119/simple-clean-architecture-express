import { Inject, Service } from 'typedi';
import { SalesInquiry } from '../../entities/SalesInquiry';
import { SalesInquiryRepository } from '../../../infrastructure/repositories/SalesInquiryRepository';
import { ISalesInquiryRepository } from '../../repositories/ISalesInquiryRepository';
import { isPhoneNumber } from '../../../utils/phoneNumber';
import { isEmail } from '../../../utils/email';
import { InvalidFieldInBodyError } from '../../errors/InvalidFieldInBodyError';

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
      throw new InvalidFieldInBodyError(
        ['contactEmail'],
        ['contactEmail should be a string.']
      );
    }
    if (!isPhoneNumber(contactPhonenumber)) {
      throw new InvalidFieldInBodyError(
        ['contactPhonenumber'],
        ['contactPhonenumber is not a valid phone number.']
      );
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
