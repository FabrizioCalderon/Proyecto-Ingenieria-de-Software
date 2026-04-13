import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function RutaProtegida({ rolRequerido }) {
  const { token, role, logout } = useAuth();

  if (!token || isTokenExpired(token)) {
    if (token) logout();
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && role !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RutaProtegida;
