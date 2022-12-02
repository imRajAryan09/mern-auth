import {
	Button,
	Card,
	FormGroup,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../Layout";

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
			width: "400px",
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
	input: {},
}));
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
			url: `${process.env.REACT_APP_API}/register`,
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
	const classes = useStyles();
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
