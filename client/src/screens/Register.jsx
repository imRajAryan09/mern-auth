import { Button, Card, FormGroup, TextField, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";

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
				width: "400px",
			},
			"& .MuiButtonBase-root": {
				margin: "16px",
			},
			"& label.Mui-focused": {
				color: "#000",
			},
			"& .MuiOutlinedInput-root": {
				"&.Mui-focused fieldset": {
					borderColor: "#902a1a",
				},
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

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { name, email, password, confirmPassword } = formData;
	const handleChange = (name) => (event) => {
		setFormData({ ...formData, [name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/auth/register`,
			data: { name, email, password },
		})
			.then((response) => {
				console.log("SIGNUP SUCCESS", response);
				setFormData({
					...formData,
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
				});
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("SIGNUP ERROR", error.response.data);
				toast.error(error.response.data.error);
			});
	};
	const { classes } = useStyles();
	return (
		<Layout>
			<ToastContainer />
			<Card className={classes.card}>
				<FormGroup>
					<Typography variant='h4' className={classes.heading}>
						Sign Up
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
						required
						onChange={handleChange("email")}
						value={email}
					/>
					<TextField
						label='Password'
						variant='outlined'
						type='password'
						required
						onChange={handleChange("password")}
						value={password}
					/>
					<TextField
						label='Confirm Password'
						variant='outlined'
						type='password'
						required
						value={confirmPassword}
						onChange={handleChange("confirmPassword")}
					/>
					<Button
						variant='contained'
						color='primary'
						size='large'
						className={classes.registerBtn}
						onClick={handleSubmit}
					>
						Register
					</Button>
				</FormGroup>
			</Card>
		</Layout>
	);
};

export default Register;
