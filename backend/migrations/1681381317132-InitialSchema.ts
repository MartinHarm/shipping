import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1681381317132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    const databaseExists = await queryRunner.hasDatabase('shipping');
    if (!databaseExists) {
      await queryRunner.createDatabase('shipping');
    }

    await queryRunner.query(`
      -- Create Country table
      CREATE TABLE IF NOT EXISTS country (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(10) NOT NULL
      );

      -- Insert sample data into Country table
      INSERT INTO country (name, code)
      VALUES ('Latvia', 'LV'),
             ('Lithuania', 'LT'),
             ('Sweden', 'SE'),
             ('Finland', 'FI'),
             ('Norway', 'NO'),
             ('Poland', 'PL');

      -- Create Parcel table
      CREATE TABLE IF NOT EXISTS parcel (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(255) NOT NULL UNIQUE,
        description VARCHAR(255) NOT NULL,
        streetAddress VARCHAR(255) NOT NULL,
        town VARCHAR(255) NOT NULL,
        country_id INT NOT NULL,
        deliveryDate DATE NOT NULL,
        CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES country (id)
      );

      -- Insert sample data into Parcel table
      INSERT INTO parcel (sku, description, streetAddress, town, country_id, deliveryDate)
      VALUES ('SKU001', 'Sample Description 1', '123 Street', 'Sample Town 1', 1, '2023-04-20'),
             ('SKU002', 'Sample Description 2', '456 Road', 'Sample Town 2', 2, '2023-04-22'),
             ('SKU003', 'Sample Description 3', '789 Avenue', 'Sample Town 3', 3, '2023-04-25'),
             ('SKU004', 'Sample Description 4', '012 Lane', 'Sample Town 4', 4, '2023-04-28');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- Drop Parcel table
      DROP TABLE IF EXISTS parcel;

      -- Drop Country table
      DROP TABLE IF EXISTS country;
    `);
  }
}
