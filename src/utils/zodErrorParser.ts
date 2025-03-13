import { ZodError } from 'zod';

export interface ParsedZodError {
  missingFields: string[];
  invalidFields: string[];
  details: string[];
}

/**
 * ZodError parser
 *
 */
/**
 *
 * @param error
 * @returns
 */
export function parseZodError(error: ZodError): ParsedZodError {
  const missingFields: string[] = [];
  const invalidFields: string[] = [];
  const details: string[] = [];

  for (const issue of error.issues) {
    const fieldPath = issue.path.join('.'); // ["organizationName"] -> "organizationName"

    // (1) requirement fields
    if (issue.code === 'invalid_type' && issue.received === 'undefined') {
      missingFields.push(fieldPath);
    } else {
      // (2) invalid fields
      invalidFields.push(fieldPath);
      details.push(issue.message);
    }
  }

  return { missingFields, invalidFields, details };
}
