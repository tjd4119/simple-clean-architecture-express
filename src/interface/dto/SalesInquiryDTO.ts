import { Exclude, Expose } from 'class-transformer';
import { InquiryStatus } from '../../domain/entities/SalesInquiry';

export class SalesInquiryDTO {
  @Expose()
  salesInquiryId: string;

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

  @Expose()
  status: InquiryStatus;

  @Expose()
  inquiredAt: Date;

  @Exclude()
  updatedAt: Date;
}
