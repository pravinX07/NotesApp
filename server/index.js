import express from 'express'
import dotenv from 'dotenv'
import connectDb from './connection.js'

const app = express()
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT || 8000
connectDb()
app.get('/',(req,res)=>{
    res.status(200).json({msg:"Server is running "})
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    
})