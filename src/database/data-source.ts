import 'dotenv/config';
import 'reflect-metadata';

import { DataSource } from 'typeorm';

const POSTGRE_PORT = Number(process.env.DATABASE_PORT);

export const PostgreDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: POSTGRE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: ['migrations/*.js'],
});
