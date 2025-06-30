import express from 'express'
import dotenv from 'dotenv'
import connectDb from './connection.js'
import userRouter from './routes/auth.js'
import notesRouter from "./routes/notes.js"
const app = express()
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT || 8000
connectDb()


app.use("/api",userRouter)
app.use("/api",notesRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    
})