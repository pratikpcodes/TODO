import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { TodoProvider } from "./Context/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
function App() {
  const [todos, setTodos] = useState([]);

  // add todo update todo delete todo are methods
  // defining the methods
  const addTodo = (todo) => {
    //fire callback settodo to get all old data
    // setTodos((oldtodo)=>[todo,...oldtodo])
    // todo is an object remember
    setTodos((oldtodo) => [...oldtodo, { id: Date.now(), ...todo }]);
    // Date.now gives new val every time
    // spread other keys of object todo in { } with id
  };

  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((individualtodo) =>
        individualtodo.id === id ? todo : individualtodo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((individualtodo) => individualtodo.id !== id)
    );
    //i guessed that filter is needed -_-
  };
  const toggleCmp = (id) => {
    setTodos((prev) =>
      prev.map((individualtodo) =>
        individualtodo.id === id
          ? { ...individualtodo, completed: !individualtodo.completed }
          : individualtodo
      )
    );
  };
  useEffect(() => {
    const todos= JSON.parse(localStorage.getItem("todos"))
    
    if(todos&& todos.length>0){
      setTodos(todos);

    }
  
  }, [])
  useEffect(() => {
   localStorage.setItem("todos",JSON.stringify(todos))
    
   
  
  }, [todos])
  

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deleteTodo, toggleCmp}}
    >
      <div className="bg-[#14171b] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodoForm/></div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
       
       // keys to verify each todo is diff
       //u can use index but use unique id to improve perf
       // reason: gayab hua toh dikkat hoga
       <div 
        className="w-full"
        key={todo.id}>
          <TodoItem todo={todo}/>
        
          
          </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
