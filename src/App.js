import * as React from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MySnackbar from "./components/SimpleSnacKbar";
import { ToastProvider } from "./components/SimpleSnackbarContext";
import TodosProvider from "./Reducer/todosContext";

function App() {
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

  const useStoredgers = JSON.parse(localStorage.getItem("todos"));
  const [todosl, setTodos] = useState(useStoredgers);

  return (
    <div className="App">
      <ThemeProvider theme={outerTheme}>
        <TodosProvider>
          <ToastProvider>
            <TodoList />
          </ToastProvider>
        </TodosProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
