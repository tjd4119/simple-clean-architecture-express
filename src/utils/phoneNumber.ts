import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
/**
 * Validate whether the input string is conform to phone number format
 *
 * @param str (string) - phone number to validate
 * @param countryCode (string) - country code
 * @returns boolean
 */
// test
export function isPhoneNumber(
  str: string,
  countryCode: CountryCode = 'KR'
): boolean {
  return isValidPhoneNumber(str, countryCode);
}
