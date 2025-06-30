import axios from "axios"
import { useEffect, useState } from "react"

export const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        const fetchNotes = async () => {
        try {
                const token = localStorage.getItem("token")
                const res = await axios.get("/api/notes",{
                    headers:{

                        Authorization:`Bearer ${token}`
                    }
                }) 
                setNotes(res.data)
            } catch (error) {
                console.log("Error fetching notes", error.message)
            }
        }

        fetchNotes()
    },[])
    return (
        <div className="bg-gray-600"> 
            <input placeholder="enter your notes"/>
            <button>Add Note</button>
            <h2>Your notes</h2>

            {notes.map((note) => (
                <p key={note._id}>{note.content}</p>
            ))}
            
        </div>
    )
}