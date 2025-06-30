import express from 'express'
import { login, signup, getAllUsers } from '../controllers/user.js'


const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/users", getAllUsers)


export default router
