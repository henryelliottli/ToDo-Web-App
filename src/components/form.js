import React from 'react'; //imported from node modules

const Form = ({inputText,setInputText, setToDos, toDos, setStatus}) => {
    //writing JS code

    const inputTextHandler = (event) =>{
      setInputText(event.target.value);
    };

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        const body = {description : inputText, completed: false};
        const response = await fetch("http://localhost:5000/todos",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        }); 
        const data = await response.json();
        setToDos([...toDos, {description: inputText, completed: false, todo_id: data.todo_id}]);
      } catch (error) {
        console.error(error);
      }

      setInputText('');
    }

    const onChangeHandler  = (event) => {
      const isCompleted = event.target.value;
      setStatus(isCompleted);
    }

    const inputValue = React.useRef();

    return  (
    <form onSubmit = {onSubmitHandler} >
    <input ref={inputValue} value = {inputText} type="text" className="todo-input" onChange = {inputTextHandler} />
    <button className="todo-button" type="submit">
      <i className="fas fa-plus-square"></i>
    </button>
    <div className="select">
      <select onChange = {onChangeHandler} name="todos" className="filter-todo">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  </form>
    );
}

export default Form;