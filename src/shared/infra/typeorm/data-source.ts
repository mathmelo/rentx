import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const DATABASE_PORT = Number(process.env.DATABASE_PORT);

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    `${__dirname}/../../../modules/**/infra/typeorm/entities/*{.ts,.js}`,
  ],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
};

export const dataSource = new DataSource(config);
