import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const DisabledBackground = styled(Box)({
	width: "100%",
	height: "100%",
	position: "fixed",
	background: "rgba(0, 0, 0, 0.2)",
	opacity: 0.5,
	zIndex: 1,
});

const CircularLoading = () => (
	<>
		<CircularProgress
			size={40}
			sx={{
				position: "fixed",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
				zIndex: 2,
				color: "#902a1a",
			}}
		/>
		<DisabledBackground />
	</>
);

export default CircularLoading;
