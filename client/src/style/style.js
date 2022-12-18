import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
	return {
		App: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
			width: "100vw",
		},
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		},
		appCard: {
			backgroundColor: "rgba(255, 255, 255, 0.2)",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			gap: "20px",
			padding: "2.5rem",
			backdropFilter: "blur(10px)",
			[theme.breakpoints.down("md")]: {
				padding: "1.5rem",
			},
		},
		appText: {
			textAlign: "center",
			fontWeight: "bold",
			lineHeight: "1",
			[theme.breakpoints.down("md")]: {
				fontSize: "2rem",
			},
		},
		appSubText: {
			textAlign: "center",
			lineHeight: "1.1",
			[theme.breakpoints.down("md")]: {
				fontSize: "1.2rem",
				lineHeight: "1",
			},
		},
		card: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "40px",
			[theme.breakpoints.down("md")]: {
				padding: "20px",
			},
			backgroundColor: "rgba(255, 255, 255, 0.5)",
			boxShadow: "0",
			backdropFilter: "blur(10px)",
			borderRadius: "0",
			"& .MuiTextField-root": {
				margin: "16px",
				width: "400px",
				[theme.breakpoints.down("md")]: {
					width: "250px",
				},
			},
			"& .MuiButtonBase-root": {
				margin: "16px",
			},
			"& label.Mui-focused": {
				color: "#000",
			},
			"& .MuiOutlinedInput-root": {
				"&.Mui-focused fieldset": {
					borderColor: "#902a1a",
				},
			},
		},
		heading: {
			textAlign: "center",
			padding: "10px",
			fontWeight: "bold",
			color: "#24140f",
			[theme.breakpoints.down("md")]: {
				fontSize: "1rem",
			},
		},
		appBtn: {
			fontSize: "1.2rem",
			[theme.breakpoints.down("md")]: {
				fontSize: ".8rem",
				marginTop: "1rem",
			},
			"&:hover": {
				scale:1.1
			}
		},
		registerBtn: {
			backgroundColor: "#902a1a",
			"&:hover": {
				backgroundColor: "#81413c",
			},
		},
	};
});

export default useStyles;
