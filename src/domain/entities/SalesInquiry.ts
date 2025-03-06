import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export const InquiryStatus = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
};

export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus];

@Entity({ schema: 'supports', name: 'sales_inquiry' })
export class SalesInquiry {
  @PrimaryGeneratedColumn({
    name: 'sales_inquiry_id',
    type: 'int',
    unsigned: true,
    comment: 'sales_inquiry_id id',
  })
  salesInquiryId: number;

  @Column({
    name: 'organization_name',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: '기관명',
  })
  organizationName: string;

  @Column({
    name: 'contact_name',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: '담당자 이름',
  })
  contactName: string;

  @Column({
    name: 'contact_email',
    type: 'varchar',
    length: 254,
    nullable: false,
    comment: '담당자 이메일',
  })
  contactEmail: string;

  @Column({
    name: 'contact_phone_number',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: '담당자 전화번호',
  })
  contactPhonenumber: string;

  @Column({
    name: 'data',
    type: 'varchar',
    length: 500,
    nullable: false,
    comment: '도입 문의 데이터',
  })
  data: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: InquiryStatus,
    nullable: false,
    comment: '도입문의 상태',
    default: InquiryStatus.PENDING,
  })
  status: InquiryStatus;

  @CreateDateColumn({
    name: 'inquired_at',
    type: 'timestamptz',
    nullable: false,
    comment: '도입 문의 시점',
  })
  inquiredAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    comment: '도입문의 상태 변경 시점',
  })
  updatedAt!: Date;

  public pending(): void {
    this.status = InquiryStatus.PENDING;
  }

  public resolved(): void {
    this.status = InquiryStatus.RESOLVED;
  }
}
