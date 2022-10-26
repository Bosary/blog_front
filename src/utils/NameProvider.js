import { createContext, useContext, useState } from "react";

const NameContext = createContext({
  user: null,
  setUser: () => "",
});

export const useName = () => useContext(NameContext);

export const NameProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("username") || null);

  return (
    <NameContext.Provider value={{ user, setUser }}>
      {children}
    </NameContext.Provider>
  );
};
