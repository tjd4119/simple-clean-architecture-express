import { DataSource, DataSourceOptions } from 'typeorm';
import path, { join } from 'path';

export function createDataSource(password: string): DataSource {
  const typeormRootPath = path.join(__dirname);

  const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PG_DB_URL || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432'),
    username: process.env.PG_DB_USER || 'user',
    password:password,
    database: process.env.PG_DB_NAME,
    synchronize: false,
    logging: true,
    entities: [join(typeormRootPath, '../../domain/entities', '*{.ts,.js}')],
    migrations: [join(typeormRootPath, './migrations', '*{.ts,.js}')],
  };

  return new DataSource(databaseConfig);
}

