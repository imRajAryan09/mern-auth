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
							<Typography variant='h2' className={classes.appText}>
								Welcome <span>{isAuth().name}</span>
							</Typography>
							<Typography variant='h5' className={classes.appSubText}>
								You have been logged in by the reverence of the almighty God
								Jesus Christ our lord and saviour
							</Typography>
							<Stack spacing={10} direction='row'>
								<Button
									variant='outlined'
									className={classes.appBtn}
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										fontSize: "1.2rem",
										textAlign: "center",
									}}
									onClick={handlePrivilege}
								>
									Update Profile
								</Button>
								<Button
									variant='outlined'
									className={classes.appBtn}
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										fontSize: "1.2rem",
										textAlign: "center",
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
							<Typography variant='h2' className={classes.appText}>
								Welcome to Mern Auth
							</Typography>
							<Typography variant='h5' className={classes.appSubText}>
								A one-stop solution for all your authentication needs
							</Typography>
							<Stack spacing={{ xs: 5, sm: 5, md: 10, lg: 10 }} direction='row'>
								<Button
									variant='outlined'
									className={classes.appBtn}
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										textAlign: "center",
									}}
									onClick={() => navigate("/login")}
								>
									Log In
								</Button>
								<Button
									variant='outlined'
									className={classes.appBtn}
									style={{
										color: "#000",
										border: "2px solid #000",
										borderRadius: "0",
										marginTop: "1.5rem",
										textAlign: "center",
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
