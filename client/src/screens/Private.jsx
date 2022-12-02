import { Navigate } from "react-router-dom";
import { isAuth } from "../utils/helper";

const Private = ({ children }) =>
	isAuth() ? children : <Navigate to='/login' />;

export default Private;
