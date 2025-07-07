import axios from "axios";
import {motion } from "framer-motion"
import { useEffect, useState } from "react";

export const Notes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.notes);
      setNotes(res.data.notes);
    } catch (error) {
      console.log("Error fetching notes", error.message);
    }
  };

  const createNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/createNote",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear inputs
      setTitle("");
      setContent("");

      // Refresh notes list
      fetchNotes();
    } catch (error) {
      console.log("Error creating note", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <motion.div 
    initial={{opacity:0, y:50}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.7}}
    className="bg-zinc-900 text-gray-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-bold">Last Updated 7 july 2025</p>
          <button className="bg-indigo-500 px-2 text-white py-2 rounded-xl hover:bg-indigo-600 cursor-pointer">
            Share
          </button>
        </div>

        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl bg-transparent  font-semibold outline-none text-white placeholder:text-gray-500 mb-4"
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[200px] bg-transparent text-lg outline-none placeholder:text-gray-500 "
          placeholder="Start writing your notes"
        />
        <button
        onClick={createNotes}
         className="bg-green-600 px-3 py-2 text-white font-bold rounded-lg hover:bg-green-500 cursor-pointer transition duration-150">
          Add Note
        </button>

        <div className="mt-8">
          <h2 className="text-gray-500 mb-5">Start from a templete</h2>
          <div className="flex gap-7">
            <button className="bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-100 ease-in cursor-pointer">
              My templates
            </button>
            <button className="bg-blue-900 font-semibold px-2 py-1 rounded-lg hover:bg-blue-800  cursor-pointer transition duration-150 ease-in-out">
              Discover more templetes
            </button>
          </div>
          <button className="text-sm  mt-3 text-gray-500 hover:underline ">
            ••• Legacy templates
          </button>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 pl-3 text-2xl font-bold ">Your Notes</h2>
          {notes.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            notes.map((note) => (
              <motion.div 
              initial={{opacity:0, y:50}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.7}}
              whileHover={{scale:1.08}}
              className=" mb-4 p-4  bg-zinc-800 shadow rounded"
                key={note._id}>
                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                <p className="text-gray-300">{note.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
