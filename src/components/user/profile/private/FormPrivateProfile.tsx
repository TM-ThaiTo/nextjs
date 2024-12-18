'use client';
import importThemeAndLanguge from "@/helper/importThemeAndLanguge"


import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';

export default function FormPrivateProfile() {
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { textColorPrimary, textColorSecondary, borderColor, linkColor } = useThemeColors();
    return (
        <>
            <hr style={{ borderTop: `0.5px solid ${borderColor}`, }} />
            <div style={{ width: '100%', maxHeight: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '100px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar sx={{ width: 90, height: 90, bgcolor: 'transparent', border: `2px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                        <LockPersonIcon style={{ fontSize: 50, color: textColorPrimary }} />
                    </Avatar>
                </div>
                <div style={{ width: '100%', maxWidth: '400px', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: '15px' }}>
                    <Typography sx={{ fontWeight: 700, color: textColorPrimary, fontSize: 17 }}>Đây là tài khoản riêng tư</Typography>
                    <Typography sx={{ color: textColorSecondary, fontSize: 15 }}>Hãy theo dõi để xem ảnh và video của họ.</Typography>
                </div>
            </div>
            <div style={{ width: '100%', maxHeight: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button sx={{
                    width: 100, height: 40, borderRadius: '15px', color: 'white', backgroundColor: '#0095f6',
                    '&:hover': { backgroundColor: linkColor }
                }}>
                    Theo dõi
                </Button>
            </div>
        </>
    )
}