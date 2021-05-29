import React from 'react';
import Todo from './Todo';

const ToDoList = ({toDos, setToDos, filteredToDos}) => {
    
    return (
        <div className="todo-container">
        <ul className="todo-list">
          {
            filteredToDos.map((e) => {
              return (
                <Todo 
                  key = {e.todo_id} 
                  todo = {e} 
                  setToDos = {setToDos} 
                  toDos = {toDos}/>
              )
            })
          }
        </ul>
      </div>
    );
}

export default ToDoList;