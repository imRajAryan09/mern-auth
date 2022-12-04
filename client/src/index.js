import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
	Activate,
	Admin,
	ForgetPassword,
	Login,
	Private,
	Register,
	ResetPassword,
} from "./screens/exportScreens";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

ReactDOM.render(
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
					<AdminRoute>
						<Admin />
					</AdminRoute>
				}
			/>
			<Route path='/auth/password/forget' element={<ForgetPassword />} />
			<Route path='/auth/password/reset/:token' element={<ResetPassword />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
