import { config } from 'src/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  entities: ['src/database/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  logging: false,
  debug: false,
  synchronize: config.env === 'development' ? true : false,
  charset: 'utf8mb4',
});
