import express from 'express'
import dotenv from 'dotenv'
import connectDb from './connection.js'
import userRouter from './routes/auth.js'
const app = express()
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT || 8000
connectDb()

app.get("/",async(req,res)=>{
    res.status(200).json({message:"Server is running Successfully"})
})
app.use("/",userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    
})