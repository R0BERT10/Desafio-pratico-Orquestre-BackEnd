import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { CreateUserTable1723165293956 } from "./migration/1723165293956-CreateUserTable";
import User from "../app/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [ User ],
  migrations: [ CreateUserTable1723165293956 ],
  subscribers: [],
  ssl: true
});