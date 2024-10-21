import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, adminRoute = false }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/search" />;
  }

  if (adminRoute && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminRoute: PropTypes.bool,
};

export default PrivateRoute;
