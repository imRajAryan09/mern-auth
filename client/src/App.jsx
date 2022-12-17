import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { isAuth, signOut } from "./utils/helper";
import useStyles from "./style/style";

function App() {
	const navigate = useNavigate();
	const { classes } = useStyles();
	const handlePrivilege = () => {
		isAuth() && isAuth().role === "admin"
			? navigate("/admin")
			: navigate("/private");
	};
	return (
		<Layout>
			<div className={classes.App}>
				<Box maxWidth='xl' component={"div"} className={classes.appCard}>
					{isAuth() ? (
						<>
							<Typography
								variant='h2'
								style={{
									textAlign: "center",
									fontWeight: "bold",
									lineHeight: "1",
								}}
							>
								Welcome <span>{isAuth().name}</span>
							</Typography>
							<Typography
								textAlign='center'
								variant='h5'
								style={{ lineHeight: "1.1" }}
							>
								You have been logged in by the reverence of the almighty God
								Jesus Christ our lord and saviour
							</Typography>
							<Stack spacing={10} direction='row'>
								<Button
									variant='outlined'
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										fontSize: "1.2rem",
									}}
									onClick={handlePrivilege}
								>
									Update Profile
								</Button>
								<Button
									variant='outlined'
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										fontSize: "1.2rem",
									}}
									onClick={() => {
										signOut(() => {
											navigate("/");
										});
									}}
								>
									Logout
								</Button>
							</Stack>
						</>
					) : (
						<>
							<Typography
								variant='h2'
								style={{
									textAlign: "center",
									fontWeight: "bold",
									lineHeight: "1",
								}}
							>
								Welcome to Mern Auth
							</Typography>
							<Typography
								textAlign='center'
								variant='h5'
								style={{ lineHeight: "1.1" }}
							>
								A one-stop solution for all your authentication needs
							</Typography>
							<Stack spacing={10} direction='row'>
								<Button
									variant='outlined'
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										fontSize: "1.2rem",
									}}
									onClick={() => navigate("/login")}
								>
									Log In
								</Button>
								<Button
									variant='outlined'
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										fontSize: "1.2rem",
									}}
									onClick={() => navigate("/register")}
								>
									Register
								</Button>
							</Stack>
						</>
					)}
				</Box>
			</div>
		</Layout>
	);
}

export default App;
