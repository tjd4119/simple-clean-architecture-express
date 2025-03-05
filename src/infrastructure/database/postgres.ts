import { DataSource, DataSourceOptions } from 'typeorm';
import path, { join } from 'path';

export function createDataSource(password: string | undefined): DataSource {
  const typeormRootPath = path.join(__dirname);

  const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    replication: {
      master: {
        host: process.env.WRITE_DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '5432'),
        username: process.env.DATABASE_USERNAME,
        password: password,
        database: process.env.DATABASE_NAME,
      },
      slaves: [
        {
          host: process.env.READ_DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT ?? '5432'),
          username: process.env.DATABASE_USERNAME,
          password: password,
          database: process.env.DATABASE_NAME,
        },
      ],
    },
    synchronize: false,
    logging: true,
    entities: [join(typeormRootPath, '../../domain/entities', '*{.ts,.js}')],
    migrations: [join(typeormRootPath, './migrations', '*{.ts,.js}')],
  };

  return new DataSource(databaseConfig);
}
