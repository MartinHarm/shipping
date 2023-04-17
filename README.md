# Shipping App

This is a shipping app consisting of an Angular frontend and a NestJS backend, using PostgreSQL as the database. The app is containerized using Docker for easy deployment.

## Getting Started

To run the app locally, follow these steps:

1. Install Docker on your machine.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the project.
4. Run the following command to build and start the app using Docker Compose:

docker-compose up --build

This will spin up the NestJS server, Angular frontend, and PostgreSQL database in separate containers.

## Initial Setup

After the app is running, you need to perform some initial setup:

1. Migrate the database: Run the following command in the `/backend` directory to apply the migrations:

npm run migrate


This will create the necessary tables in the PostgreSQL database with some sample content.

Accessing the App
Once the app is running, you can access it in your web browser using the following URLs:

Backend API(includes swaggerUI): http://localhost:3000/api
Angular frontend: http://localhost:4200
Technologies Used: Angular,NestJS,TypeORM,PostgreSQL, Docker

## Parcel Schema

The app uses a `Parcel` schema to represent parcels that can be shipped. A sample `Parcel` object is shown below:

```json
{
  "sku": "ABC123",
  "description": "Example parcel",
  "streetaddress": "1234 Example St",
  "town": "Example Town",
  "countrycode": "LV",
  "deliverydate": "2023-04-13"
}