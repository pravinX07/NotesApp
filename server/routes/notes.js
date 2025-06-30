import express from "express"
import {protect} from "../middleware/authMiddleware.js"
import { createNote, getAllNotes, getNoteById, deleteNote } from "../controllers/notes.js"

const router = express.Router()


router.post("/",protect, createNote)
router.get("/", protect, getAllNotes)
router.get("/:id", protect, getNoteById)
// router.patch("/:id", protect, updateNote)
router.delete("/:id", protect, deleteNote)

export default router