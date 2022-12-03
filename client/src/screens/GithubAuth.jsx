import { Box, Button } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";

const GithubAuth = () => {	
	return (
		<Box
			component='div'
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button
				variant='outlined'
				startIcon={<GitHubIcon />}
				style={{
					color: "#000",
					border: "2px solid #000",
					borderRadius: "0",
					marginTop: "1rem",
					fontSize: "1rem",
				}}
				// onClick={}
			>
				Sign In with Github
			</Button>
		</Box>
	);
};

export default GithubAuth;
