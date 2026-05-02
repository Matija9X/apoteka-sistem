import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const doktor = localStorage.getItem("ulogovaniDoktor");

  if (!doktor) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;