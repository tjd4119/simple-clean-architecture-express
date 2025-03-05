import { SalesInquiry } from '../entities/SalesInquiry';

export interface ISalesInquiryRepository {
  createSalesInquiry(sales_inquiry: SalesInquiry): Promise<SalesInquiry>;
  getSalesInquiry(salesInquiryId: number): Promise<SalesInquiry | null>;
  updateSalesInquiry(sales_inquiry: SalesInquiry): Promise<SalesInquiry>;
  deleteSalesInquiry(salesInquiryId: number): Promise<void>;
}
