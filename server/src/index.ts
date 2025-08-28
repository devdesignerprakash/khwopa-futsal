import express from 'express';
import  cors from 'cors';
import { DbConnection } from './config/databaseConfig';

const app= express()


// json data
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cors())

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