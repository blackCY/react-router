import * as React from "react";

export const createNameContext = (name) => {
  const context = React.createContext();
  context.displayName = name;

  return context;
};
