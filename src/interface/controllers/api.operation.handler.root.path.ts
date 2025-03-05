import path from 'path';

/**
 * [API operation handler root path]
 *
 * Get root path for operation handler directory
 * This will be used at `express-openapi-validator` middleware
 * to match operation Id with handler function
 *
 */
export const apiOperationHandlerRootPath = path.join(__dirname);
