import { createConnection } from 'typeorm';
import dotenv from 'dotenv'; 

dotenv.config();

export const connectDB = async () => {
    try {

        await createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: true, 
            entities: [
                "src/entity/*.js",
            ],
        });
        console.log('PostgreSQL connected with TypeORM');
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1);
    }
};
