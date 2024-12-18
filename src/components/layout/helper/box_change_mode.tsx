import React, { useContext } from 'react';
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '@/theme/theme.context';
import { updateTheme } from '@/actions/user/actions';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';

type Props = {
    handleChangeTheme: () => void;
}
export default function BoxChangeMode({ handleChangeTheme }: Props) {
    const lang = getLanguage();
    const { textColorPrimary, boxColor, actionHoverColor } = useThemeColors();
    const themeContext = useContext(ThemeContext);
    if (!themeContext) { throw new Error('ThemeContext must be used within a ThemeContextProvider'); }
    const { setMode, mode } = themeContext;
    const handleMode = async () => {
        const { data, error } = await updateTheme();
        if (error) return;
        if (data) {
            const newMode = mode === 'light' ? 'dark' : 'light';
            localStorage.setItem("mode", newMode);
            setMode(newMode);
        }
    }
    return (
        <Box sx={{ width: 266, height: 120, backgroundColor: boxColor }}>
            <Box sx={{ width: 266, height: 40, backgroundColor: boxColor, color: textColorPrimary }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: '10px' }}>
                    <IconButton onClick={handleChangeTheme} sx={{ color: textColorPrimary }} >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: 16, color: textColorPrimary }}>{locales[lang]?.switchAppearance}</Typography>
                    <>{mode === 'light' ? <FaSun style={{ color: textColorPrimary, fontSize: '25px' }} /> : <FaMoon style={{ color: textColorPrimary, fontSize: '25px' }} />}</>
                </Box>
            </Box>
            <hr style={{ color: boxColor }} />
            <Box sx={{ height: 80 }}>
                <FormControlLabel
                    control={
                        <Switch checked={mode === 'dark'} onChange={handleMode} color="primary" />
                    }
                    label={locales[lang]?.darkMode}
                    labelPlacement="start"
                    sx={{
                        width: '100%', height: 65,
                        justifyContent: 'space-between',
                        ml: 0, pr: '5px', pl: '5px',
                        borderRadius: '10px',
                        '&:hover': { backgroundColor: actionHoverColor }
                    }}
                />
            </Box>
        </Box>
    )
}