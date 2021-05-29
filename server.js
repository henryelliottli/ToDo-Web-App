const express = require("express");
const app = express(); //run express
const cors = require('cors');
const client = require('./db.js');
const { response, request } = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

client.connect();

//process.env.PORT
//process.env.NODE_ENV => production or undefined
// app.use(express.static(path.join(__dirname, "client/build"))); //hit all the static files
// pool.connect();



//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); => for demonstration



if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(PORT);

//ROUTES//

//create a todo

app.post("/todos", async (request,response)=>{
    try{
        const {completed, description} = request.body;
        const newTodo = await client.query("INSERT INTO todo (completed, description) VALUES($1,$2) RETURNING *", 
        [completed, description]); //command INTO database (column) VALUES($placeholder) returning data, [value]
        response.json(newTodo.rows[0]);
    } catch(err){
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async (request, response)=>{
    try{
        const allToDos = await client.query("SELECT * FROM todo");
        
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
        const selectedToDos = await client.query("SELECT * FROM todo WHERE todo_id = ($1)",
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
        const updateToDo = await client.query("UPDATE todo SET completed = $1 WHERE todo_id = $2",
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
        const updateToDo = await client.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
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
        const deletedToDo = await client.query("DELETE FROM todo WHERE todo_id = $1",
        [id]);
        // response.json("todo was updated");
        response.send(`Todo #${id}` + " was deleted");
    }catch(err){
        console.error(err);
    }
})

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`);
})