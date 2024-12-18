
'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import { useRouter } from '@/utils/hooks/router/useRouter';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant'
import { putUpdateCusstomHidden } from '@/actions/hidden-word/action';

type Props = {
    data: any
}
const CustomHiddenWordsForm = ({ data }: Props) => {
    const { cusstomHidden, hideCommentWithCustomHidden } = data;
    const lang = getLanguage();
    const router = useRouter();
    const { textColorPrimary, borderColor } = useThemeColors();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar()
    const [keywords, setKeywords] = useState(cusstomHidden);
    const [isHideCommentsCustomHidden, setIsHideCommentsCustomHidden] = useState<boolean>(hideCommentWithCustomHidden);

    const handleBack = () => router.push('/account/hidden-words');
    const handleChangeHideCommentsCusstomHidden = (event: React.ChangeEvent<HTMLInputElement>) => setIsHideCommentsCustomHidden(event.target.checked)
    const handleSubmit = async () => {
        const dto = { cusstomHidden: keywords, hideCommentWithCustomHidden: isHideCommentsCustomHidden, }
        const { data, error } = await putUpdateCusstomHidden(dto);
        if (data) { setSnackbarMessage({ type: 'success', message: data?.message }); setOpenSnackbar(true); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
    };

    return (
        <Box sx={{ color: textColorPrimary, padding: 3, borderRadius: 2, maxWidth: 600, margin: '0 auto', }} >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleBack} sx={{ color: textColorPrimary, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ArrowBackIosNewIcon /></IconButton>
                <Typography variant="h6" > {locales[lang]?.hiddenWord?.customHidden?.commentFiltering} </Typography>
            </div>
            <Typography variant="body2" gutterBottom sx={{ mt: '20px' }}> {locales[lang]?.hiddenWord?.customHidden?.keywordFilters} </Typography>
            <Typography variant="caption" gutterBottom>{locales[lang]?.hiddenWord?.customHidden?.hideCommentKeywordPost} </Typography>

            <TextField
                variant="outlined" fullWidth multiline rows={5}
                placeholder={locales[lang]?.hiddenWord?.customHidden?.addKeywordCommas}
                sx={{ borderRadius: 1, marginTop: 1, marginBottom: 2, }}
                InputProps={{ style: { color: textColorPrimary }, }}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
            />

            <FormControlLabel
                control={<Switch checked={isHideCommentsCustomHidden} onChange={handleChangeHideCommentsCusstomHidden} sx={{ '& .MuiSwitch-thumb': { color: isHideCommentsCustomHidden ? '#1e88e5' : '#757575', }, }} />}
                label={locales[lang]?.hiddenWord?.hideComments}
                labelPlacement="start"
                sx={{ color: textColorPrimary, display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 0, }}
            />
            <Typography variant="caption">{locales[lang]?.hiddenWord?.customHidden?.hideCommentKeywordPost}</Typography>
            <Divider sx={{ backgroundColor: borderColor, marginY: 3, }} />
            <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ backgroundColor: '#1e88e5', '&:hover': { backgroundColor: '#1565c0', }, }} >{locales[lang]?.submit}</Button>
        </Box>
    );
};

export default CustomHiddenWordsForm;
