import "reflect-metadata"
import "dotenv/config";
import express from "express"
import cors from "cors"
import { AppDataSource } from "./database/data-source"
import routes from "./app/routes";

if (AppDataSource.isInitialized === false){
    AppDataSource.initialize().then(async () => {
        console.log("Database OK")
    })
} else { console.warn("Database já inicializado.") }

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

export default app