import db from "../dbConfig.js";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHnadler.js";

const JWT_SECRET ="jdlfhiubeu2893ibhif795615fihfugb";

export const signup =async(req,res ,next) =>{
    const {username ,email ,password} =req.body;
    try {
        const uniqueEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(uniqueEmail.rows.length > 0) {
            return next(errorHandler(500,"Email already exists"));
        }

        const uniqueUsername = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if(uniqueUsername.rows.length > 0) {
            return next(errorHandler(500,"Username already exists"));
        }

        const result = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning *", [username,email,password]);
        
        res.json(result.rows[0]);

    } catch (error) {
        next();
    }
}


export const signin =async(req,res,next) =>{
    const {email , password } = req.body;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2",[email,password]);
        if(result.rows.length === 0) {
            return next(errorHandler(500,"Invalid username or password"));
        }
        const token = jwt.sign({id: result.rows[0].id , username : result.rows[0].username},JWT_SECRET ,{expiresIn: "1h"});
        res.cookie("token", token  ,{
            httpOnly: true,
            secure :true
        });
        res.json(result.rows[0]);
    } catch (error) {
        next(errorHandler(500,error.message));
    }
}


export const signout = (req,res) =>{
    res.clearCookie("token");
    res.json({message : "Signout success"});
};