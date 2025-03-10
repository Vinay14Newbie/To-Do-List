import { useContext, createContext } from "react";


// To prevent errors if the context provider is not used properly. These default values act as placeholders and provide a clear structure for what the context will contain.
export const TodoContext = createContext({
    todos : [
        {
            id: 1,
            todo: " Todo msg",
            completed: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const TodoProvider = TodoContext.Provider

export const useTodo = ()=>{
    return useContext(TodoContext);
}