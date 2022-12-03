import { Navigate } from "react-router-dom";
import { isAuth } from "../utils/helper";

const PrivateRoute = ({ children }) => {
	return isAuth() ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
