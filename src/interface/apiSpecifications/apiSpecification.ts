import path from 'path';

/**
 * Allowed client IP addresses for private API
 *
 */

/**
 * Base urls
 *
 */
export const BASEURL_DEVELOP_ENV = 'api.dev.sarco.fit';
export const BASEURL_PRODUCTION_ENV = 'api.sarco.fit';

/**
 * API gateway port number
 *
 */
export const apiGatewayPort = 3000;

/**
 * API specification document filename
 *
 */
const apiSpecificationFilename = 'apispec.yaml';

/**
 * API specification document
 *
 */
export const apiSpecification = path.join(__dirname, apiSpecificationFilename);
