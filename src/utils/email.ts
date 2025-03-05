import validator from 'validator';
/**
 * Validate whether the input string is conform to email format
 *
 * @param email
 * @returns boolean
 */
export function isEmail(str: string): boolean {
  return validator.isEmail(str);
}
