import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // Update with the actual name or IP address of your database container
  port: 5432, // Update with the actual port number of your PostgreSQL container
  username: 'your_database_username', // Update with the actual username for your PostgreSQL database
  password: 'your_database_password', // Update with the actual password for your PostgreSQL database
  database: 'shipping',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Update with the actual path to your entity files
  migrations: ['migrations/*.{js,ts}'], // Update with the actual path to your migration files
});
