import db from "../dbConfig.js";


export const home =(req,res)=>{
    res.json("ok").status(200);
}


export const Alltasks = async(req,res,next) =>{
    const {id} = req.body;
    try {
        const result = await db.query("select users.id, users.username,users.email,tasks.task, tasks.id from users join tasks on users.email = tasks.email where users.id = $1",[id]);
        const tasks = result.rows.map((row) =>{
            return{
                id :row.id,
                task : row.task
            }
        });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}


export const addTask = async(req,res ,next) =>{
    const {email,task} = req.body;
    try{
        const result = await db.query("insert into tasks (email,task) values ($1,$2) returning *",[email,task]);
        res.json(result.rows[0]); 
    }
    catch(error){
        next(error);
    }
}


export const deleletask = async(req,res,next) =>{
    const {id} = req.body;
    try {
        const result = await db.query("delete from tasks where id = $1",[id]);
        res.json("successfully deleted");
    } catch (error) {
        next(error);
    }
}