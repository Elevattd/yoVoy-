import dotenv from 'dotenv';

dotenv.config();

const config = {
 dbUser: process.env.DB_USER || 'postgres',
 dbPassword: process.env.DB_PASSWORD || '1234',
 dbHost: process.env.DB_HOST || 'localhost',
 dbName: process.env.DB_NAME || 'yovoy',
 dbPort: process.env.DB_PORT || 5432,
 dev: process.env.NODE_ENV !== 'production',
 port: process.env.PORT || '3001',
 cors: process.env.CORS || 'localhost:3000',
 API_HOST: process.env.API_HOST || 'http://localhost:3001',
 FRONT_HOST: process.env.FRONT_HOST || 'http://localhost:3000',
 ACCESS_TOKEN: process.env.ACCESS_TOKEN || "TEST-6618463267359012-061115-bb4818d20c1253649161e38df3c16fc7-612785330",
 CLIENT_ID: process.env.CLIENT_ID,
 CLIENT_SECRET: process.env.CLIENT_SECRET
};

export default config;