import { useLocation, Navigate, Outlet } from "react-router-dom";
import { token } from "./Components/Tools/Token";

const RequireAuth = () => {
  const location = useLocation();

  // prettier-ignore
  return token
        ? <Outlet />
        : <Navigate to={`/login?redirect=${location.pathname}`} state={{ from: location }} replace />;
};

export default RequireAuth;
