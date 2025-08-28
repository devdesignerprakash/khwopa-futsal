
import { DataSource } from "typeorm"
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, "../models/*.entity.ts")],
    synchronize: true,
    logging: true,

})
export const DbConnection = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }

}
