import 'dotenv/config';
import * as process from 'node:process';

interface EnvConfig {
  APP_ENV: string;
  APP_PORT: number;
  APP_HOST: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
  JWT_TOKEN: string;
}

const config: EnvConfig = {
  APP_PORT: parseInt(process.env.APP_PORT || '3000', 10),
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  APP_ENV: process.env.APP_ENV || 'development',
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  DB_HOST: process.env.DB_HOST || 'amlak-mysql',
  DB_NAME: process.env.DB_NAME || 'amlak-db',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  JWT_TOKEN:
    process.env.JWT_TOKEN ||
    'Rz2aM90g6E0Tsihuod21XyGBeD3345EwMCUyg2H4KbPeWovDhzRHTpCs8KoWrkZO',
};

export default config;
