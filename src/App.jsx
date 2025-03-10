import { useEffect, useState } from "react";
import { TodoProvider } from "./context/index";
import "./App.css";
import Form from "./components/Form";
import Item from "./components/Item";

function App() {
  // if we don't declare the the value of 'todos' OR dont provide Provider, here it will give default value which we already had declared in Context file :/
  // const {todos} = useTodo()
  // console.log(todos);  // completed: false
  // id: 1
  // todo: " Todo msg"

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // here useStat return prev data as a argument in a callback, so prev = prev array
    // ...todo includes all properties from todo object
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  // using filter for deleting a value is a good approach
  // object with same id will be filterd out
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  // first take all values of same id by spreading, then take completed key in it and reverse the value of it
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    // during setting the localstorage it take values in string only so convert it into string first
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // console.log(todos); //[] | on first rendering
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[rgb(23,40,66)] h-[100vh] py-8 ">
        <div className="w-full min-w-[800px] max-w-[800px] mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Form />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Item todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
