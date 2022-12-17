import { Box } from "@mui/material";
import useStyles from "../style/style";

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
