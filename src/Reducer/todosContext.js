import TodosReducer from "../Reducer/TodosReducer.js";
import { useContext, useReducer, createContext } from "react";
export const todolistContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todosl, despatch] = useReducer(TodosReducer, []);
  return (
    <todolistContext.Provider value={{ todosl: todosl, despatch: despatch }}>
      {children}
    </todolistContext.Provider>
  );
};
export default TodosProvider;
