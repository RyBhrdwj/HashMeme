import React, { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const fetchAuth = async () => {
  const response = await axios.get(`${SERVER_URL}/api/protected`, {
    withCredentials: true,
  });

  return response.data.username;
};

export const AuthProvider = ({ children }) => {
  const {
    data: username,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
  });

  const [authState, setAuthState] = useState({ username, isLoading, isError });

  useEffect(() => {
    setAuthState({ username, isLoading, isError });
  }, [username, isLoading, isError]);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <AuthContext.Provider value={{ ...authState, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
