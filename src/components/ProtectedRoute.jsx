import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  return isAuthenticated ? children : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
