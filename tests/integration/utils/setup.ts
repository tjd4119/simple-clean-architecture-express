import { PostgreSqlContainer } from '@testcontainers/postgresql';
import dotenvFlow from 'dotenv-flow';
import { createDataSource } from '../../../src/infrastructure/database/postgres';

dotenvFlow.config();

const init = async () => {
  await initpostgresql();
};

const initpostgresql = async () => {
  const databaseName = process.env.DATABASE_NAME || 'sarcofit';

  const postgresql = await new PostgreSqlContainer()
    .withDatabase(databaseName)
    .start();

  process.env.WRITE_DATABASE_HOST = postgresql.getHost();
  process.env.READ_DATABASE_HOST = postgresql.getHost();
  process.env.DATABASE_PORT = postgresql.getPort().toString();
  process.env.DATABASE_USERNAME = postgresql.getUsername();
  process.env.DATABASE_PASSWORD = postgresql.getPassword();

  const database = createDataSource(process.env.DATABASE_PASSWORD);
  await database.initialize();
  await database.runMigrations();
  await database.destroy();
};

module.exports = async () => {
  await init();
};
