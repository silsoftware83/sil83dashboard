/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect } from 'react';
import { decryptString } from '../utils/encript';
import Request from '../utils/http';
const request = new Request()

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkIsAuth: () => void;
  loadUser: () => void;
  getModules: (id:number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
 const checkIsAuth = () => {
      const token = sessionStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
  useEffect(() => {
    const checkIsAuth = () => {
      const token = sessionStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkIsAuth(); // Verifica si ya hay token al montar
  }, []);

  const login = (token: string) => {
    sessionStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const loadUser=()=> {
    let usuario = null
    
    const tokenString = window.sessionStorage.getItem("token");
    if (tokenString) {
      const tk: any = tokenString;
      usuario = decryptString(tk);

      return JSON.parse(usuario);
    }

  }
   async function getModules(id:number) {
   
    const response = await request.get(`getModules/${id}`);
   
    if (response && response.statusCode === 200) {
      return response.result.data;
    }
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkIsAuth,loadUser,getModules }}>
      {children}
    </AuthContext.Provider>
  );
};
