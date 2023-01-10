import { Button, Card, FormGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CircularLoading from "../components/CircularLoading";
import Layout from "../components/Layout";
import useStyles from "../style/style";

const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/auth/password/forget`,
			data: { email },
		})
			.then((response) => {
				console.log("FORGOT PASSWORD SUCCESS", response);
				setLoading(false);
				toast.success(response.data.message);
				setEmail("");
			})
			.catch((error) => {
				console.log("FORGOT PASSWORD ERROR", error.response.data);
				setLoading(false);
				toast.error(error.response.data.error);
			});
	};
	const { classes } = useStyles();
	return (
		<Layout>
			{loading ? <CircularLoading /> : null}
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
