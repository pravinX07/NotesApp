import Notes from "../models/notes.js";



export const createNote = async (req, res) => {
    try {
        const { title, content, tags, isPublic } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const note = await Notes.create({
            title,
            content,
            tags: Array.isArray(tags) ? tags : [],
            isPublic: typeof isPublic === 'boolean' ? isPublic : false,
            user: req.user._id
        });
        return res.status(201).json({
            message: "Note created",
            note
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create note",
            error: error.message
        });
    }
};


export const getAllNotes = async(req,res) => {
    try {
        const notes = await Notes.find({user:req.user._id}).sort({createdAt:-1})
        if(!notes){
            return res.status(500).json({
                message:"Notes not found"
            })
    
    
        }
        return res.json({notes})
    
    } catch (error) {
         return res.status(400).json({
            message:"Notes not found" , error:error.message
         })
    }


}

export const getNoteById = async (req,res) => {
   try {
     const notes = await Notes.findOne({_id:req.params.id , user:req.user._id})
            if(!notes){
             return res.status(500).json({
                 message:"Notes not found"
             })
         }
 
         return res.json({notes})
   } catch (error) {
     return res.status(500).json({
        message:"fai;ed to fetch notes" , error: error.message
     })
   }


}


// export const updateNote = async(req,res) =>{


// }

export const deleteNote = async (req,res) => {
    try {
        const note = await Notes.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id
        })

        if(!note) {
            return res.status(500).json({message:"note not found"})
        }

        return res.json({message:"note deleted"})
    } catch (error) {
         return res.status(500).json({
            message:"failed to delete note",  error:error.message
         })
    }
}