import mongoose from "mongoose";
import User from "./user";


const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Note Title is required"]
    },
    content:{
        type:String,
        required:[true,"Note content is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    tags:[{
        type:String,


    }],
    isPublic:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const Notes = mongoose.model("notes",notesSchema)
export default Notes