import React, { useEffect, useState } from "react";
import './App.css';
//importing Components
import Form from './components/form';
import ToDoList from './components/ToDoList';

function App() {
  //setState variables
  const [inputText, setInputText] = useState('');
  const [toDos, setToDos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredToDos, setFilterToDos] = useState([]);

  //handlers for filtering
  const filterHandler = () =>{
    if (status === "all"){
      return toDos
    }
    else if(status === "completed"){
      return toDos.filter(el => el.completed === true)
    }
    else if (status === "incomplete"){
      return toDos.filter(el => el.completed === false)
    }
    else{
      alert("this is not a valid filter")
    }
  }

  //get Todos from database
  const getAllTodos = async ()=>{
    const response = await fetch("http://localhost:5000/todos",{
      method : "GET"
    })
    const data = await response.json();
    setToDos(data);
  };

  //rerender everytime status and toDos changes 
  React.useEffect(()=>{
    setFilterToDos(filterHandler);
  },[toDos, status])
  //render once when application starts
  React.useEffect(()=> {
    getAllTodos();
  },[])



  // function saveToDos() {
  //   if (localStorage.getItem("ToDoList") === null){
  //     window.localStorage.setItem("ToDoList",JSON.stringify([]));  
  //   }
  //   else{
  //     window.localStorage.setItem("ToDoList",JSON.stringify(toDos));
  //   }
  // }

  return (
    <div className="App">
      <header>Henry's ToDo List</header>
      {/* <button onClick = {getAllTodos}>HERE</button> */}
      <Form 
        inputText = {inputText} 
        setInputText = {setInputText} 
        setToDos = {setToDos} 
        toDos = {toDos}
        setStatus = {setStatus}
        />
      <ToDoList 
        toDos={toDos} 
        setToDos={setToDos} 
        filteredToDos ={filteredToDos} 
        setFilterToDos={setFilterToDos}/>
    </div>
  );
}

export default App;

