import express from "express";
import AuthRouter from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));


app.use('/api/auth', AuthRouter);
app.use('/api/user' ,UserRouter);

app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode||500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        success : false,
        message : message,
        statusCode
    });
    
    
});