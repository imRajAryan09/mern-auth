import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
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
		},
		card: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "40px",
			backgroundColor: "rgba(255, 255, 255, 0.5)",
			boxShadow: "0",
			backdropFilter: "blur(10px)",
			borderRadius: "0",
			"& .MuiTextField-root": {
				margin: "16px",
				width: "400px",
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
		},
		btn: {
			color: "#000",
			border: "2px solid #000",
			borderRadius: "0",
			marginTop: "1.5rem",
			fontSize: "1.2rem",
			textAlign: "center",
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