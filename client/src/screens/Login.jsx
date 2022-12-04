import {
	Button,
	Card,
	FormGroup,
	TextField,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { authenticate, isAuth } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import GoogleAuth from "./GoogleAuth";
import { Divider } from "@mui/material";
import GithubAuth from "./GithubAuth";
const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(5),
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		boxShadow: "0",
		backdropFilter: "blur(10px)",
		borderRadius: "0",
		"& .MuiTextField-root": {
			margin: theme.spacing(2),
			width: "300px",
		},
		"& .MuiButtonBase-root": {
			margin: theme.spacing(2),
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
}));

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { email, password } = formData;
	const handleChange = (name) => (event) => {
		setFormData({ ...formData, [name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/auth/login`,
			data: { email, password },
		})
			.then((response) => {
				console.log("SIGNIN SUCCESS", response);
				authenticate(response, () => {
					setFormData({
						...formData,
						email: "",
						password: "",
					});
					toast.success(response.data.message);
				});
			})
			.catch((error) => {
				console.log("SIGNIN ERROR", error.response.data);
				toast.error(error.response.data.error);
			});
	};
	const informParent = (response) => {
		authenticate(response, () => {
			toast.success("Login Success");
			navigate("/");
		});
	};
	const classes = useStyles();
	return (
		<Layout>
			<ToastContainer />
			<Card className={classes.card}>
				{useEffect(() => {
					if (isAuth()) {
						navigate("/");
					}
				})}
				<FormGroup>
					<Typography variant='h4' className={classes.heading}>
						Sign In
					</Typography>
					<GoogleAuth informParent={informParent} />
					<GithubAuth />
					<Divider>OR</Divider>
					<TextField
						label='Email'
						variant='outlined'
						type='email'
						required
						value={email}
						onChange={handleChange("email")}
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
						Login
					</Button>
					<Typography
						style={{
							textAlign: "center",
							textDecoration: "underline",
							cursor: "pointer",
						}}
						onClick={() => navigate("/auth/password/forget")}
					>
						Forgot Password?
					</Typography>
				</FormGroup>
			</Card>
		</Layout>
	);
};

export default Login;
