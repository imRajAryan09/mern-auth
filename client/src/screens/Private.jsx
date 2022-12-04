import { Button, Card, FormGroup, TextField, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import { getCookie, isAuth, updateUser } from "../utils/helper";

const useStyles = makeStyles()(() => {
	return {
		card: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "40px",
			backgroundColor: "rgba(255, 255, 255, 0.5)",
			boxShadow: "0",
			backdropFilter: "blur(10px)",
			borderRadius: "0",
			"& .MuiTextField-root": {
				margin: "16px",
				width: "300px",
			},
			"& .MuiButtonBase-root": {
				margin: "16px",
			},
		},
		heading: {
			textAlign: "center",
			padding: "10px",
			fontWeight: "bold",
			color: "#24140f",
		},
		registerBtn: {
			backgroundColor: "#902a1a",
			"&:hover": {
				backgroundColor: "#81413c",
			},
		},
	};
});

const Private = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});
	const navigate = useNavigate();
	const loadProfile = () => {
		const token = getCookie("token");
		console.log(isAuth());
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("PRIVATE PROFILE UPDATE", response);
				const { name, email, role } = response.data;
				setFormData({ ...formData, name, email, role });
			})
			.catch((error) => {
				console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
				if (error.response.status === 401) {
					toast.error(error.response.data.error);
					navigate("/login");
				}
			});
	};
	useEffect(() => {
		loadProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { email, password, role, name } = formData;
	const handleChange = (name) => (event) => {
		setFormData({ ...formData, [name]: event.target.value });
	};
	const handleSubmit = (event) => {
		const token = getCookie("token");
		event.preventDefault();
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/user/update`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: { name, password },
		})
			.then((response) => {
				console.log("PRIVATE USER UPDATE SUCCESS", response);
				updateUser(response, () => {
					setFormData({ ...formData, password: "" });
					toast.success("Profile Updated Successfully");
				});
			})
			.then(navigate("/"))
			.catch((error) => {
				console.log("PRIVATE USER UPDATE ERROR", error.response);
				// toast.error(error.response);
			});
	};
	const { classes } = useStyles();
	return (
		<Layout>
			<ToastContainer />
			<Card className={classes.card}>
				<FormGroup>
					<Typography variant='h4' className={classes.heading}>
						Update Profile
					</Typography>
					<TextField
						label='Your Name'
						variant='outlined'
						required
						onChange={handleChange("name")}
						value={name}
						className={classes.input}
					/>
					<TextField
						label='Email'
						variant='outlined'
						type='email'
						value={email}
						disabled
					/>
					<TextField
						label='Role'
						variant='outlined'
						type='text'
						value={role}
						disabled
					/>
					<TextField
						label='Password'
						variant='outlined'
						type='password'
						required
						value={password}
						onChange={handleChange("password")}
					/>
					<Button
						variant='contained'
						color='primary'
						size='large'
						className={classes.registerBtn}
						onClick={handleSubmit}
					>
						Update
					</Button>
				</FormGroup>
			</Card>
		</Layout>
	);
};

export default Private;
