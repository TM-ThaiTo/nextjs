import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <div style={{ padding: 10, fontWeight: 700, width: '100%', display: 'flex', height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ color: '#000000', fontWeight: 700, }}>© 2024 Copyright by </Typography>
            <Typography sx={{ fontWeight: 700, ml: 1 }}>
                <a href="https://www.facebook.com/to.trinh.520900" target="blank" style={{ textDecoration: 'none', color: '#007bff' }}>Alex Trinh</a>
            </Typography>
        </div>
    )
}