import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const VideoContainer = styled(Paper)(({ theme }: any) => ({
    position: "relative",
    width: "100%",
    height: 0,
    paddingBottom: "56.25%", // 16:9 aspect ratio
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    boxShadow: theme.shadows[4],
}));

const VideoElement = styled("video")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
});

const ControlsOverlay = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
});
const ChatContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    height: "200px",
    overflowY: "auto",
}));


export { VideoContainer, VideoElement, ControlsOverlay, ChatContainer };