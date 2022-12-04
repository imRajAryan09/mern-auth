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
		input: {},
	};
});

const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const handleSubmit = (event) => {
		event.preventDefault();
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/auth/password/forget`,
			data: { email },
		})
			.then((response) => {
				console.log("FORGOT PASSWORD SUCCESS", response);
				toast.success(response.data.message);
				setEmail("");
			})
			.catch((error) => {
				console.log("FORGOT PASSWORD ERROR", error.response.data);
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
						Forgot Password
					</Typography>
					<TextField
						label='Email'
						variant='outlined'
						type='email'
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<Button
						variant='contained'
						color='primary'
						size='large'
						className={classes.registerBtn}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</FormGroup>
			</Card>
		</Layout>
	);
};

export default ForgetPassword;
