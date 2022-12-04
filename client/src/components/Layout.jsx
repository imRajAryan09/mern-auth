import { Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
	return {
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		},
	};
});

const Layout = ({ children }) => {
	const { classes } = useStyles();
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
