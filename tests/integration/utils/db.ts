import datasource from '../../../scripts/local.datasource';
import assert from 'assert';

export async function cleanUpDatabase() {
  // if NODE_ENV is not test, do not clean up database
  assert(process.env.NODE_ENV === 'test');

  if (!datasource.isInitialized) await datasource.initialize();

  const entities = datasource.entityMetadatas.map((entity) => {
    return {
      name: entity.name,
      tableName: entity.tableName,
      schema: entity.schema,
    };
  });

  // clean up database
  try {
    for (const entity of entities) {
      const repository = datasource.getRepository(entity.name);

      await repository.query(`SET Search_Path TO ${entity.schema}`);

      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

export async function closeDatabase() {
  if (datasource.isInitialized) await datasource.destroy();
}
