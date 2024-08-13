import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { CreateUserTable1723165293956 } from "./migration/1723165293956-CreateUserTable";
import User from "../app/entities/User";
import { CreateGenreTable1723557451769 } from "./migration/1723557451769-CreateGenreTable";
import { CreateMovieTable1723557464411 } from "./migration/1723557464411-CreateMovieTable";
import { CreateReviewTable1723558523401 } from "./migration/1723558523401-CreateReviewTable";
import { Genre } from "../app/entities/Genre";
import { Movie } from "../app/entities/Movie";
import { Review } from "../app/entities/Review";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [ User, Genre, Movie, Review ],
  migrations: [ 
    CreateUserTable1723165293956,
    CreateGenreTable1723557451769, 
    CreateMovieTable1723557464411, 
    CreateReviewTable1723558523401
  ],
  subscribers: [],
  ssl: true
});