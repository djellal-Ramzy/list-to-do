import { v4 as uuidv4 } from "uuid";
import { TostContext } from ".././components/SimpleSnackbarContext";
import { useContext } from "react";

export default function TodosReducer(currentState, options) {
  switch (options.type) {
    case "add":
      const listTodo = [
        ...currentState,
        {
          id: uuidv4(),
          title: options.pyload.title,
          detail: options.pyload.title,
          isComplet: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(listTodo));
      return listTodo;
    case "dellet":
      const deletTodos = currentState.filter(
        (t) => t.id !== options.pyload.element.id
      );
      localStorage.setItem("todos", JSON.stringify(deletTodos));
      return deletTodos;

    case "update":
      const updateConfirm = currentState.map((t) => {
        if (t.id === options.pyload.id) {
          return {
            ...t,
            title: options.pyload.title,
            detail: options.pyload.detail,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updateConfirm));
      return updateConfirm;
    case "check": {
      const updateTodos = currentState.map((t) => {
        if (t.id == options.pyload.id) {
          const newElements = { ...t, isComplet: !t.isComplet };
          return newElements;
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updateTodos));

      return updateTodos;
    }

    case "get": {
      const useStoredgers =
        JSON.parse(localStorage.getItem("todos")) !== null
          ? JSON.parse(localStorage.getItem("todos"))
          : [];
      if (useStoredgers) {
        return useStoredgers;
      }
    }

    default:
      throw new Error("uknown action " + options.type);
  }
}
