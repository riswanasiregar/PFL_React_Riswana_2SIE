import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAdmin({ children }) {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div className="p-4 text-center text-gray-400">Loading...</div>;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/member" replace />;
  }

  return children;
}
