import { z } from 'zod';
import { isEmail } from '../../utils/email';
import { isPhoneNumber } from '../../utils/phoneNumber';

export const SalesInquirySchema = z.object({
  organizationName: z
    .string({
      invalid_type_error: 'organizationName should be a string',
    })
    .max(45, 'organizationName exceeds the length limit.'),
  contactName: z
    .string({
      invalid_type_error: 'contactName should be a string',
    })
    .max(45, 'organizationName exceeds the length limit.'),
  contactEmail: z
    .string({
      invalid_type_error: 'contactEmail should be a string',
    })
    .refine((val) => isEmail(val), {
      message: 'contactEmail is not a valid email.',
    }),
  contactPhonenumber: z
    .string({
      invalid_type_error: 'contactPhonenumber should be a string',
    })
    .refine((val) => isPhoneNumber(val), {
      message: 'contactPhonenumber is not a valid phone number.',
    }),
  data: z
    .string({
      invalid_type_error: 'data should be a string',
    })
    .max(500, 'data exceeds the length limit.'),
});

export type SalesInquiryRequest = z.infer<typeof SalesInquirySchema>;
