import React, { useState,useEffect } from 'react';

const App = () => {

  const [todos,setTodos] = useState([]);
  const [todoTitle,setTodoTitle] = useState("");

  const fetchAllTodos = async() => {

    fetch('http://localhost:3000/todos')  //Get Request
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  };

  useEffect(() => {
    fetchAllTodos();
  },[]);  //dependency array khali

   const submitHandler = async (e) => {

    if(todoTitle.trim() === ""){
      return alert('Please provide a valid todo title');
    }
    e.preventDefault();

    fetch('http://localhost:3000/todos' , {
      method: "POST",
      body: JSON.stringify({title: todoTitle,isCompleted: false}),
      headers: {
        "Content-type": "application/json",
      }
    }) .then(() => {
      fetchAllTodos();
    });
   };

   
const Remover = async (id) => {
  
  await fetch(`http://localhost:3000/todos/${id}`, { //template literal - jekhane string vitore variable o boste pare
    method: "DELETE"
  });

  setTodos(todos.filter(todo => todo.id !== id));
};

  return (
    <>

    <form onSubmit={submitHandler}>
      <input type="text " value={todoTitle} 
      onChange={(e) => setTodoTitle(e.target.value) } />

       <button type='submit'>ADD Todo</button>
    </form>
   

    <h2>All Todos</h2>

    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => Remover(todo.id)}>Remove</button>
        </li>
      ))}
    </ul>


    
    </>
  );
};

export default App;