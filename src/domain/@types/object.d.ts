/**
 * Declaraiton of jsonable types
 *
 */
declare type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

/**
 * Email type
 *
 */
declare type Email = string;

/**
 * Gender type
 *
 */
declare type Gender = 'm' | 'f';
