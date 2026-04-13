import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function parseUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario")) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [usuario, setUsuario] = useState(parseUsuario);

  const login = (token, role, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setRole(role);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
