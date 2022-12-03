import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
	Activate,
	Admin,
	Login,
	Private,
	Register,
} from "./screens/exportScreens";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

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
					<AdminRoute>
						<Admin />
					</AdminRoute>
				}
			/>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	</BrowserRouter>
);
