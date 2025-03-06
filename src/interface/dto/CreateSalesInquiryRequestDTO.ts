import { Expose } from 'class-transformer';

export class CreateSalesInquiryRequestDTO {
  @Expose()
  organizationName: string;

  @Expose()
  contactName: string;

  @Expose()
  contactEmail: string;

  @Expose()
  contactPhonenumber: string;

  @Expose()
  data: string;
}
