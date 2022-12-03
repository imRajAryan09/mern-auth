import { Box, Button } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";
const GithubAuth = () => {
	useEffect(()=>{
		if (window.location.search) {
			const code = new URLSearchParams(window.location.search).get("code");
			console.log(code);
		}
	const githubLogin = () => {
		window.location.assign(
			"https://github.com/login/oauth/authorize?client_id=" +
				process.env.REACT_APP_GITHUB_CLIENT_ID
		);
	};
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
				onClick={githubLogin}
			>
				Sign In with Github
			</Button>
		</Box>
	);
};

export default GithubAuth;
