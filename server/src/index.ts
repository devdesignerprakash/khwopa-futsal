import express from 'express';
import  cors from 'cors';
import { DbConnection } from './config/databaseConfig';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger/swagger.json'
import {RegisterRoutes} from '../build/routes/routes'
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './utils/globalErrorHandler';

// import swaggerDocument from ""

const app= express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// json data
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(globalErrorHandler)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app)

//running server
app.listen(8000,()=>{
    DbConnection().then(()=>{
        console.log('database connected')
    }
    ).catch((err)=>{
        console.log(err)
    })
    console.log('server is listening on port 8000')
})