import User from "../models/user.js"
import jwt from 'jsonwebtoken'

export const protect = async(req,res, next) => {
    try {
        const authheaders = req.headers.authorization
    
        if(!authheaders || !authheaders.startsWith("Bearer ")){
            return res.status(401).json({
              message:"Unauthorize user token might be expire"
            })
        }
    
        const token  = authheaders.split(" ")[1]
    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decoded.userId).select("-password");
        if (!req.user) {
            return res.status(401).json({
                message: "User not found for this token"
            })
        }
        next();
    } catch (error) {
         return res.status(401).json({
            message:"Token expire: ", error : error.message
         })
    }
}
