import axios from "axios"
import { useEffect, useState } from "react"

export const Notes = () => {
    // const [inputVal, setInputVal] = useState("")
    const [notes, setNotes] = useState([]);


  const createNotes = async() => {
    const note = await axios.post("http://localhost:8000/api/createNote",
        title,
        content,
        tags,
        isPublic
    )
  }

    useEffect(()=>{
        const fetchNotes = async () => {
        try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://localhost:8000/api/notes",{
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
        <div className="bg-gray-600 flex justify-center items-center text-white "> 
          <h1>Notes App</h1>
            <input
            value={inputVal}
            onChange={(e)=>setInputVal(e.target.value)}
             placeholder="enter your notes " className="px-4 py2 bg-gray-4"/>
            <button className="bg-green-500 hover:bg-green-600 ">Add Note</button>
            <h2>Your notes</h2>

            {notes.map((note) => (
                <p key={note._id}>{note.content}</p>
            ))}
            
        </div>
    )
}