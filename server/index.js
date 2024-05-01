import express from 'express'
import connectDB from "./db/db.js"
import authRoutes from "./routes/authRoute.js"

connectDB() 

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000");
})
