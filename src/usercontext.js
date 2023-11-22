import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState(null);


  const singin = (userData,userData2) => {
    // Lógica para iniciar sesión
    console.log("userData ", userData)
    console.log("userData2 ", userData2)
    setUser(userData);
    setUser2(userData2);

  };

  const logout = () => {
    // Lógica para cerrar sesión
    setUser(null);
    setUser2(null);
    // Agrega la lógica para establecer loggedIn en true

    console.log("Logout correcto")
  };

  return (
    <UserContext.Provider value={{ user, user2, singin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
