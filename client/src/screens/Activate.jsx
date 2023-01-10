import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import { Button, Card, FormGroup, Typography } from "@mui/material";
import useStyles from "../style/style";
import { useState } from "react";
import CircularLoading from "../components/CircularLoading";

const Activate = () => {
	let name = "User";
	const { token } = useParams();
	const { decodedToken } = useJwt(token);
	if (decodedToken) {
		name = decodedToken.name;
	}
	// console.log(decodedToken);
	const [loading, setLoading] = useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/auth/activation`,
			data: { token },
		})
			.then((response) => {
				console.log("ACTIVATION SUCCESS", response);
				setLoading(false);
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("ACTIVATION ERROR", error.response.data.error);
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
					<Typography variant='h5' className={classes.heading}>
						{`Hey ${name}, Ready to activate your account !`}
					</Typography>
					<Button
						variant='contained'
						color='primary'
						size='large'
						className={classes.registerBtn}
						onClick={handleSubmit}
					>
						Activate
					</Button>
				</FormGroup>
			</Card>
		</Layout>
	);
};

export default Activate;
