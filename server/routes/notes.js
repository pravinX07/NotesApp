import express from "express"
import {protect} from "../middleware/authMiddleware.js"
import { createNote, getAllNotes, getNoteById, deleteNote } from "../controllers/notes.js"

const router = express.Router()


router.post("/createNote",protect, createNote)
router.get("/notes", protect, getAllNotes)
router.get("/notes/:id", protect, getNoteById)
// router.patch("/:id", protect, updateNote)
router.delete("/deleteNote/:id", protect, deleteNote)

export default router