import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Settings from '@mui/icons-material/Settings'
import BarChart from '@mui/icons-material/BarChart'
import Bookmark from '@mui/icons-material/Bookmark'
import Brightness4 from '@mui/icons-material/Brightness4'
import ReportProblem from '@mui/icons-material/ReportProblem'
import SwitchAccount from '@mui/icons-material/SwitchAccount'
import Logout from '@mui/icons-material/Logout'
import BoxChangeMode from './box_change_mode';
import { buttonTextStyle, iconStyle, linkStyle } from '../styles';
import { logoutAction } from '@/actions/auth/actions';
import { locales } from '@/language/constant';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { signOut } from 'next-auth/react';
import useThemeColors from '@/utils/hooks/theme/hookTheme';

type Props = {
    menuPosition: { top: number, left: number };
    menuRef: React.RefObject<HTMLDivElement>;
    myUser: any;
}

export default function MenuSlider({ menuPosition, menuRef }: Props) {
    const { textColorPrimary, boxColor, actionHoverColor } = useThemeColors();
    const [openSwitchTheme, setOpenSwitchTheme] = useState<boolean>(false);
    const handleChangeTheme = () => setOpenSwitchTheme(!openSwitchTheme);
    const topMenu = !openSwitchTheme ? menuPosition.top - 390 : menuPosition.top - 152;
    const lang = getLanguage();

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            const { data, error } = await logoutAction();
            if (error) return;
            if (data) signOut({ callbackUrl: "/auth/login" });
        } else console.log('User cancelled logout');
    }
    const boxMenu = {
        position: 'fixed',
        backgroundColor: boxColor || 'transparent',
        borderRadius: '10px',
        padding: '10px',
        zIndex: 999,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
    const buttonStyle = {
        display: 'flex',
        height: 50,
        width: '100%',
        borderRadius: '10px',
        alignItems: 'center',
        padding: '10px 15px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            backgroundColor: actionHoverColor,
        },
    };
    return (
        <Box ref={menuRef} sx={{ ...boxMenu, top: `${topMenu}px`, left: `${menuPosition.left}px` }} >
            {openSwitchTheme
                ? <BoxChangeMode handleChangeTheme={handleChangeTheme} />
                : <Box sx={{ height: 'auto', maxHeight: '400px', width: 266, }}>
                    <Link href={'/account/edit'} style={{ ...linkStyle }}>
                        <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={() => console.log('Settings clicked')}>
                            <Settings sx={iconStyle} />
                            <Typography sx={buttonTextStyle}>{locales[lang]?.setting}</Typography>
                        </Box>
                    </Link>
                    <Link href={'/your_activity'} style={linkStyle}>
                        <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={() => console.log('Your activity clicked')}>
                            <BarChart sx={iconStyle} />
                            <Typography sx={buttonTextStyle}>{locales[lang]?.yourActivity}</Typography>
                        </Box>
                    </Link>
                    <Link href="/saved" style={linkStyle}>
                        <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={() => console.log('Saved clicked')}>
                            <Bookmark sx={iconStyle} />
                            <Typography sx={buttonTextStyle}>{locales[lang]?.saved}</Typography>
                        </Box>
                    </Link>
                    <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={handleChangeTheme}>
                        <Brightness4 sx={iconStyle} />
                        <Typography sx={buttonTextStyle}>{locales[lang]?.switchAppearance}</Typography>
                    </Box>
                    <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={() => console.log('Report a problem clicked')}>
                        <ReportProblem sx={iconStyle} />
                        <Typography sx={buttonTextStyle}>{locales[lang]?.reportaProblem}</Typography>
                    </Box>
                    <hr style={{ color: boxColor }} />
                    <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={() => console.log('Switch accounts clicked')}>
                        <SwitchAccount sx={iconStyle} />
                        <Typography sx={buttonTextStyle}>{locales[lang]?.switchAccounts}</Typography>
                    </Box>
                    <Box sx={{ ...buttonStyle, color: textColorPrimary }} onClick={handleLogout}>
                        <Logout sx={iconStyle} />
                        <Typography sx={buttonTextStyle}>{locales[lang]?.logOut}</Typography>
                    </Box>
                </Box>
            }
        </Box >
    )
}