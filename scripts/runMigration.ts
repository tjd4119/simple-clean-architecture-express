import { getDatabasePassword } from '../src/infrastructure/aws/secretManager';
import { createDataSource } from '../src/infrastructure/database/postgres';
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

async function runMigrations() {
  const password = await getDatabasePassword();
  const dataSource = createDataSource(password);
  await dataSource.initialize();

  const result = await dataSource.runMigrations({
    transaction: 'all',
  });
  console.log('Migrations Result:', result);
  await dataSource.destroy();
}

runMigrations().catch((err) => {
  console.error('Migration Failed!', err);
  process.exit(1);
});
