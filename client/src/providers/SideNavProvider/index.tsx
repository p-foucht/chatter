import React, { createContext, useState, useContext } from 'react';

interface NavType {
  isOpen: boolean;
  setOpen: (condition: boolean) => void;
}

const Context = createContext<NavType | null>(null);

const SideNavProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Context.Provider value={{ isOpen, setOpen }}>{children}</Context.Provider>
  );
};

const useSideNav = (): NavType => {
  const sideNav = useContext(Context);

  if (!sideNav) {
    throw new Error('Must be used in Side Bar Provider');
  }

  return sideNav;
};

export { SideNavProvider, useSideNav };
