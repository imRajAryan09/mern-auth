import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Activate from "./screens/Activate";
import PrivateRoute from "./routes/PrivateRoute";
import Private from "./screens/Private";
import AdminRoutes from "./routes/AdminRoute";
import Admin from "./screens/Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route exact path='/' element={<App />} />
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='/auth/activate/:token' element={<Activate />} />
			<Route
				path='/private'
				element={
					<PrivateRoute>
						<Private />
					</PrivateRoute>
				}
			/>
			<Route
				path='/admin'
				element={
					<AdminRoutes>
						<Admin />
					</AdminRoutes>
				}
			/>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</BrowserRouter>
);
