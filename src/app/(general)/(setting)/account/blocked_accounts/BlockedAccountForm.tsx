'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { useRouter } from '@/utils/hooks/router/useRouter';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import { deleteBlock } from "@/actions/block/actions";

type Props = {
    data: any,
    query: any,
}

export default function BlockedAccountForm({ data }: Props) {
    const lang = getLanguage();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { textColorPrimary, textColorSecondary, borderColor, actionHoverColor } = useThemeColors();
    const router = useRouter();

    const handleBack = () => router.back();

    const handleUnBlock = async (idUser: string) => {
        const dto = { idUserBlock: idUser, }
        const { data, error } = await deleteBlock(dto);
        if (data) { setSnackbarMessage({ type: 'success', message: data?.message }); setOpenSnackbar(true); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
    }
    return (
        <Box sx={{ maxWidth: 610, mx: "auto", mt: 4, p: 3, display: "flex", flexDirection: "column" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleBack} sx={{ color: textColorPrimary, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ArrowBackIosNewIcon /></IconButton>
                <Typography variant="h6" > {locales[lang]?.block?.accountBlock} </Typography>
            </div>
            <Typography variant="body2" gutterBottom sx={{ mt: '20px', color: textColorSecondary, fontSize: 15 }}> {locales[lang]?.block?.nodeAccountBlock} </Typography>

            <Box sx={{ maxHeight: 700, width: '100%' }}>
                {data?.length === 0
                    ? <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ color: textColorSecondary }}> {locales[lang]?.block?.noBlock} </Typography>
                    </Box>
                    : <Box sx={{ height: '100%', width: '100%', mt: 2 }}>
                        {data?.map((item: any, index: any) => {
                            const { id, avatar, name, userName } = item;
                            return (
                                <Box key={index} sx={{ height: 50, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}>
                                        <Avatar src={avatar || '/static/avt_default.png'} alt="avatar" sx={{ height: 45, width: 45, objectFit: 'contain' }} />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: textColorPrimary }}>{userName}</Typography>
                                            <Typography sx={{ fontSize: 15, fontWeight: 600, color: textColorSecondary }}>{name}</Typography>
                                        </Box>
                                    </div>
                                    <div style={{ width: 150, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button onClick={() => handleUnBlock(id)}
                                            variant="contained" sx={{ backgroundColor: borderColor, color: textColorPrimary, '&:hover': { backgroundColor: actionHoverColor, }, }}>
                                            {locales[lang]?.block?.unBlock}
                                        </Button>
                                    </div>
                                </Box>
                            )
                        })}
                    </Box>}
            </Box>
        </Box>
    )
}