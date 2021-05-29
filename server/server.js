const express = require("express");
const app = express(); //run express
const cors = require('cors');
const pool = require('./db');
const { response, request } = require("express");

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request.body

//ROUTES//

//create a todo

app.post("/todos", async (request,response)=>{
    try{
        const {completed, description} = request.body;
        const newTodo = await pool.query("INSERT INTO todo (completed, description) VALUES($1,$2) RETURNING *", 
        [completed, description]); //command INTO database (column) VALUES($placeholder) returning data, [value]
        response.json(newTodo.rows[0]);
    } catch(err){
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async (request, response)=>{
    try{
        const allToDos = await pool.query("SELECT * FROM todo");
        
        response.json(allToDos.rows);
        // response.send(response)

    } catch(err){
        console.error(err);
    }
})

//get a todo

app.get("/todos/:id", async (request, response)=>{
    try{
        const id = request.params.id;
        const selectedToDos = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)",
        [id]);
        response.json(selectedToDos.rows);
    }catch(err){
        console.error(err);
    }
})

//update a todo

app.put("/todos/completed/:id", async (request, response)=>{
    try{
        const id = request.params.id;
        const completedStatus = request.body.completed;
        const updateToDo = await pool.query("UPDATE todo SET completed = $1 WHERE todo_id = $2",
        [completedStatus, id]);
        // response.json("todo was updated");
        response.send("Completed Status was updated");
    }catch(err){
        console.error(err);
    }
})

app.put("/todos/description/:id", async (request, response)=>{
    try{
        const id = request.params.id;
        const description = request.body.description;
        const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]);
        // response.json("todo was updated");
        response.send("Todo was updated");
    }catch(err){
        console.error(err);
    }
})

//delete a todo
app.delete("/todos/:id", async(request, response)=>{
    try{
        const id = request.params.id;
        const deletedToDo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]);
        // response.json("todo was updated");
        response.send(`Todo #${id}` + " was deleted");
    }catch(err){
        console.error(err);
    }
})

app.listen(5000, ()=>{
    console.log("server has started on port 5000");
})