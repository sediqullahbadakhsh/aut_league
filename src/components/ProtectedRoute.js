import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ isSignedIn, children }) {
  const token = localStorage.getItem("token");
  if (!isSignedIn && !token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
export default ProtectedRoute;
