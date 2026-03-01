import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

  const token = localStorage.getItem("alumni_token");
  const user = JSON.parse(localStorage.getItem("alumni_user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}