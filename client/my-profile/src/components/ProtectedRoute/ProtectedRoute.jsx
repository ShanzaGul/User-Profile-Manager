import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
