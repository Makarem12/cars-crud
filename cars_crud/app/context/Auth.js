// /context/Auth.js
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthWrapper({ children }) {
  const [globalLoginState, setGlobalLoginState] = useState({
    tokens: null,
    username: null,
    login,
    logout
  });

  async function login(userInfo) {
    const url = 'http://127.0.0.1:8000/api/token/';
    try {
      const res = await axios.post(url, userInfo);
      setGlobalLoginState({
        tokens: res.data,
        username: userInfo.username,
        login,
        logout
      });
      return userInfo.username;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }

  function logout() {
    setGlobalLoginState({
      tokens: null,
      username: null,
      login,
      logout
    });
  }

  return (
    <AuthContext.Provider value={globalLoginState}>
      {children}
    </AuthContext.Provider>
  );
}
