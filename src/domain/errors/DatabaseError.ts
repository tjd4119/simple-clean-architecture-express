import { IEntityErrorOptions, EntityError } from './EntityError';

/**
 * Database error options.
 *
 */
export interface IDatabaseErrorOptions extends IEntityErrorOptions {
  sql?: string;
}

/**
 * Database error foundation class.
 * All specific database-related errors MUST inherit this error class.
 *
 * @param category - Category of database error.
 * - Not connected - Failed to connect to database server
 * - Timeout - Queires taking too long or deadlocks occurs
 * - Invalid query - Incorrect SQL syntax or referencing non-existent tables or columns
 * - Transaction failed - Block query transaction failure
 * - Violated data integrity - Violations of primary key constraints, foreign key constraints, data uniqueness, ...
 * - Insufficient permission - User permission or audience problem
 * - Exceed resource limit - Exceeding storage capacity or hitting limits on the number of concurrent connections
 * - Unknown - Unknown reason
 *
 * @param message - Database specific error message.
 * @param options - Options to contain specific error cause and context.
 *
 */
export class DatabaseError extends EntityError {
  constructor(
    public readonly category: DatabaseErrorCategory,
    message?: string,
    options?: IDatabaseErrorOptions
  ) {
    super(message, options);
  }
}

/**
 * Types of database error reasons.
 *
 */
export type DatabaseErrorCategory =
  | 'Not connected' // Failed to connect to database server
  | 'Timeout' // Queires taking too long or deadlocks occurs
  | 'Invalid query' // Incorrect SQL syntax or referencing non-existent tables or columns
  | 'Transaction failed' // Block query transaction failure
  | 'Violated data integrity' // Violations of primary key constraints, foreign key constraints, data uniqueness, ...
  | 'Insufficient permission' // User permission or audience problem
  | 'Exceed resource limit' // Exceeding storage capacity or hitting limits on the number of concurrent connections
  | 'Unknown'; // Unknown reason;
