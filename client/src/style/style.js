import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
	return {
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
		registerBtn: {
			backgroundColor: "#902a1a",
			"&:hover": {
				backgroundColor: "#81413c",
			},
		},
	};
});

export default useStyles;