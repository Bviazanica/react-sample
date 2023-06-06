import React from "react";

const TodoContext = React.createContext({});

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // todo
  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);

  if (!context) {
    throw Error("TodoContext hook can be used only inside TodoContextProvider");
  }

  return context;
};
