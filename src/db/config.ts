import { Book } from '../entities/book.entity.js';
import { User } from '../entities/user.entity.js';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DATABASE_DIALECT as any,
  url: process.env.DATABASE_URL,
  entities: [User, Book],
  migrations: [],
  synchronize: true,
  migrationsRun: false,
  logging: true,
};

export default config;
