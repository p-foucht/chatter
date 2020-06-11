import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthType } from "../../types/authTypes";

// Not sure how I should write the authenticate method right here
const Context = createContext({
  token: "",
  isAuthenticated: false,
  loading: false,
  authenticate: (data: any) => console.log(data),
});

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check local storage for token when app loads
  useEffect(() => {
    const uToken = localStorage.getItem("token");
    if (!uToken) {
      return;
    }
    setToken(uToken);
    setAuthenticated(true);
  }, []);

  // Update or put token in local storage when it changes
  useEffect(() => {
    localStorage.setItem("token", token);
    setAuthenticated(token !== null);
  }, [token]);

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
      setToken(token);
      setAuthenticated(token !== null);
    } catch (err) {
      console.log(err); // Manage error eventually
    }

    setLoading(false);
  };

  return (
    <Context.Provider value={{ token, isAuthenticated, loading, authenticate }}>
      {children}
    </Context.Provider>
  );
};

const useAuth = (): AuthType => {
  const auth = useContext(Context);

  return auth;
};

export { AuthProvider, useAuth };
