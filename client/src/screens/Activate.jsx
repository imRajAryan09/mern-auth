import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(3),
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

const Activate = () => {
	let name = "";
	const { token } = useParams();
	const { decodedToken } = useJwt(token);
	if (decodedToken) {
		name = decodedToken.name;
	} else {
		name = "User";
	}
	console.log(decodedToken);
	const handleSubmit = (event) => {
		event.preventDefault();
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/auth/activation`,
			data: { token },
		})
			.then((response) => {
				console.log("ACTIVATION SUCCESS", response);
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("ACTIVATION ERROR", error.response.data.error);
				toast.error(error.response.data.error);
			});
	};
	const classes = useStyles();
	return (
		<Layout>
			<Card className={classes.card}>
				<ToastContainer />
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
			</Card>
		</Layout>
	);
};

export default Activate;
