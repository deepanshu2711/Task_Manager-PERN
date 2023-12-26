import pg from "pg";    


const db = new pg.Client({
    host: "localhost",
    port: 5432,
    database: "todoList",
    user: "postgres",
    password: "deepanshu2711"
});


db.connect((err) =>{
    if(err){
        console.log("Database not connected !")
    }
    else{
        console.log("Database connected !")
    }
});

export default db;