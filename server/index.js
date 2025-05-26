import express from 'express'
import dotenv from 'dotenv'
import connectDb from './connection.js'
import { signup } from './controllers/user.js'
import User from './models/user.js'

const app = express()
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT || 8000
connectDb()

app.get("/",async(req,res)=>{
    res.status(200).json({message:"Server is running Successfully"})
})
app.post("/signup",signup)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    
})