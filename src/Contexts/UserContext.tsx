import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface IUser {
  name: string;
  email: string;
  department: string;
  role: string;
}

export interface IUserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const sessionUser = localStorage.getItem("user");
    setUser(sessionUser ? JSON.parse(sessionUser) : null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
