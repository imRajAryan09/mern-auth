import { Box, Button } from "@material-ui/core";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
const GoogleAuth = ({ informParent = (f) => f }) => {
	useEffect(() => {
		gapi.load("client:auth2", () => {
			gapi.auth2.init({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			});
		});
	}, []);
	const responseGoogle = (response) => {
		console.log(response.tokenId);
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/auth/login/google`,
			data: { idToken: response.tokenId },
		})
			.then((response) => {
				console.log("GOOGLE SIGNIN SUCCESS", response);
				informParent(response);
			})
			.catch((error) => {
				console.log("GOOGLE SIGNIN ERROR", error.response.data);
			});
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
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				render={(renderProps) => (
					<Button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						variant='outlined'
						startIcon={<GoogleIcon />}
						style={{
							color: "#000",
							border: "2px solid #000",
							borderRadius: "0",
							marginTop: "1.5rem",
							fontSize: "1rem",
						}}
					>
						Sign In with Google
					</Button>
				)}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
		</Box>
	);
};

export default GoogleAuth;
