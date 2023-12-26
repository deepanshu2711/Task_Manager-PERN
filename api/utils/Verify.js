
const JWT_SECRET ="jdlfhiubeu2893ibhif795615fihfugb";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHnadler.js";

export const verifyUser =(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return next(errorHandler(401,"Please login first"));
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(403,"authentication failed"));
        }
        req.user = user;
    
    })
    next();
}