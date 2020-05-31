import React, { useState, createContext, useContext } from "react";

import ChimeSdkWrapper from "../SDK/Chime";

const Context = createContext<ChimeSdkWrapper | null>(null);

const ChimeProvider: React.FC = ({ children }) => {
  const [chime] = useState(() => new ChimeSdkWrapper());

  return <Context.Provider value={chime}>{children}</Context.Provider>;
};

const useChime = (): ChimeSdkWrapper => {
  const chime = useContext(Context);

  if (!chime) {
    throw new Error("useChime must be used within a ChimeProvider");
  }

  return chime;
};

export { ChimeProvider, useChime };
