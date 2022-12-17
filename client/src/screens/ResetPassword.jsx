import { Button, Card, FormGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import useStyles from "../style/style";

const ResetPassword = () => {
	const { token } = useParams();
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const { password, confirmPassword } = formData;
	const handleChange = (name) => (event) => {
		setFormData({ ...formData, [name]: event.target.value });
	};
	const handleSubmit = (event) => {
		console.log(password);
		event.preventDefault();
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/auth/password/reset`,
			data: { newPassword: password, resetPasswordLink: token },
		})
			.then((response) => {
				console.log("RESET PASSWORD SUCCESS", response);
				setFormData({
					...formData,
					password: "",
					confirmPassword: "",
				});
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("RESET PASSWORD ERROR", error.response.data);
				toast.error(error.response.data.error);
			});
	};
	const { classes } = useStyles();
	return (
		<Layout>
			<ToastContainer />
			<Card className={classes.card}>
				<FormGroup>
					<Typography variant='h5' className={classes.heading}>
						Please Enter Your New Password
					</Typography>
					<TextField
						label='New Password'
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

export default ResetPassword;
