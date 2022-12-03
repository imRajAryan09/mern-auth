import { Navigate } from "react-router-dom";
import { isAuth } from "../utils/helper";

const AdminRoute = ({ children }) =>
	isAuth() && isAuth().role === "admin" ? children : <Navigate to='/login' />;

export default AdminRoute;
