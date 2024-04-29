import express from 'express'
import connectDB from "./db/db.js"
const app = express()

connectDB() 

app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000");
})
