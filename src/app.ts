import "reflect-metadata"
import "dotenv/config";
import express from "express"
import cors from "cors"
import { AppDataSource } from "./database/data-source"
import routes from "./app/routes";


const app = express()
app.use(cors())
app.use(express.json())

if (AppDataSource.isInitialized === false){
    AppDataSource.initialize().then(async () => {
        app.use(routes)
        console.log("Database OK")
    })
} else { console.warn("Database já inicializado.") }

export default app