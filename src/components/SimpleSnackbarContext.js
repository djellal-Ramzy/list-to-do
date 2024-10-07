import { createContext } from "react";
import MySnackbar from "./SimpleSnacKbar";
import * as React from "react";
export const TostContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const showSnackbar = (messageEfect) => {
    setOpen(true);
    setMessage(messageEfect);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  return (
    <TostContext.Provider value={{ showSnackbar }}>
      <MySnackbar open={open} message={message} />
      {children}
    </TostContext.Provider>
  );
};
