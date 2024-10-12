import config from '../config';
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
});
