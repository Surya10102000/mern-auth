import express from 'express'
import connectDB from "./db/db.js"
import authRoutes from "./routes/authRoute.js"
import { errorHandler } from './middlewares/error.js'
import cors from 'cors'

connectDB() 

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/auth', authRoutes)

app.use(errorHandler)

app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000");
})
