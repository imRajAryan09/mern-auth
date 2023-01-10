import { Button, Card, FormGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import useStyles from "../style/style";
import { useNavigate } from "react-router-dom";
import CircularLoading from "../components/CircularLoading";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { name, email, password, confirmPassword } = formData;
	const handleChange = (name) => (event) => {
		setFormData({ ...formData, [name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			setLoading(true);
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
					setLoading(false);
					toast.success(response.data.message);
				})
				.catch((error) => {
					console.log("SIGNUP ERROR", error.response.data);
					setLoading(false);
					toast.error(error.response.data.error);
				});
		}
	};
	const { classes } = useStyles();
	return (
		<Layout>
			{loading ? <CircularLoading /> : null}
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
					<Typography
						style={{
							textAlign: "center",
							marginTop: "1rem",
						}}
					>
						Already have an account?{" "}
						<span
							onClick={() => navigate("/login")}
							style={{ textDecoration: "underline", cursor: "pointer" }}
						>
							Sign In
						</span>
					</Typography>
				</FormGroup>
			</Card>
		</Layout>
	);
};

export default Register;
