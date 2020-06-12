import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthType } from "../../types/authTypes";

const Context = createContext<AuthType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Check local storage for token when app loads
  useEffect(() => {
    const uToken = localStorage.getItem("token");
    const uName = localStorage.getItem("username");
    if (!uToken || !uName) {
      return;
    }
    setToken(uToken);
    setUsername(uName);
    setAuthenticated(true);
  }, []);

  // Update or put token in local storage when it changes
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setAuthenticated(token !== null);
  }, [token, username]);

  // Network req using axios, deafult mode is login, adds email field and changes url if mode is signup
  const authenticate = async (data: any) => {
    setLoading(true);

    const { username, password, email, mode = "signin" } = data;
    let req = { username, password };
    let url = `https://0jz2o6umd9.execute-api.us-east-1.amazonaws.com/dev/auth/signin`;

    if (mode === "signup") {
      req["email"] = email;
      url =
        "https://0jz2o6umd9.execute-api.us-east-1.amazonaws.com/dev/auth/signup";
    }

    try {
      const res = await axios.post(url, req);
      let { token } = res.data;
      let { username } = res.data.user;
      setToken(token);
      setUsername(username);
      setAuthenticated(token !== null);
    } catch (err) {
      console.log(err); // Manage error eventually
    }

    setLoading(false);
  };

  return (
    <Context.Provider
      value={{ token, username, isAuthenticated, isLoading, authenticate }}
    >
      {children}
    </Context.Provider>
  );
};

const useAuth = (): AuthType => {
  const auth = useContext(Context);

  if (!auth) {
    throw new Error("Must be used in AuthProvider");
  }

  return auth;
};

export { AuthProvider, useAuth };
