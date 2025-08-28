import express from 'express';
import  cors from 'cors';

const app= express()


// json data
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cors())

//running server
app.listen(8000,()=>{
    console.log('server is listening on port 8000')
})