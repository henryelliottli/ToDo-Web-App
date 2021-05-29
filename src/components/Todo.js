import React from 'react';

const Todo = ({todo, toDos, setToDos}) => {
    const deleteHandler= async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
            method: "DELETE",
            })
            const data = await response.text()
            console.log(data)
            setToDos(toDos.filter( el => el.todo_id !== todo.todo_id))
        } catch (error) {
            console.error(error);
        }     
    }
    const completedHandler =  async () =>  {
        try {
            const body = {completed : !todo.completed};
            const response = await fetch(`http://localhost:5000/todos/completed/${todo.todo_id}`,{
                method: "PUT",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(body)
            }
            )
            const data = await response.text();
            setToDos(toDos.map((el) => {
                if (el.todo_id === todo.todo_id){
                    return {...el, completed : !el.completed}
                }
                return el
            }))
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="todo">
            <li className={`todo-item" ${todo.completed ? "completed" : ""}`}>{todo.description}</li>
            <button className = "complete-btn" onClick = {completedHandler}>
                <i className="fas fa-check"></i>
                </button>
            <button className = "trash-btn" onClick = {deleteHandler}>
                <i className="fas fa-trash"></i>
                </button>
        </div>
        );
}

export default Todo;