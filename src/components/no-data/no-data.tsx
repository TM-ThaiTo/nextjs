import Box from "@mui/material/Box";
import { BiData } from "react-icons/bi";
import Typography from "@mui/material/Typography";

export default function NoData() {
    return (
        <Box sx={{ height: 200, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <BiData size={100} />
            <Typography variant="h5">No data</Typography>
        </Box>
    )
}