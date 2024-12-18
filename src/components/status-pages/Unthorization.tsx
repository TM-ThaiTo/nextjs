import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UnauthorizedPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2,
            }}
        >
            <Typography variant="h3" color="error" gutterBottom>
                403 - Unauthorized
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                You do not have permission to access this page.
            </Typography>
        </Box>
    )
}
