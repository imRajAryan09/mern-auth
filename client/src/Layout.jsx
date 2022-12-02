// import Navbar from "./components/Navbar";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
	},
}));
const Layout = ({ children }) => {
	const classes = useStyles();
	return (
		<>
			{/* <Navbar /> */}
			<Box component={"div"} className={classes.container}>
				{children}
			</Box>
		</>
	);
};

export default Layout;
