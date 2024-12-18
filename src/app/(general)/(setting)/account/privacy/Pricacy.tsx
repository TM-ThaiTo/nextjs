'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import ModalConfimPricacy from "./modal.confim.pricacy";
import { updatePrivacy } from "@/actions/user/actions";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";

type Props = {
    data: any
};

export default function PricacyForm({ data }: Props) {
    const lang = getLanguage();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { textColorPrimary, backgroundColor, linkColor } = useThemeColors();
    const [isPrivateAccount, setIsPrivateAccount] = useState<boolean>(data?.privateAccount);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCloseConfirm = async () => { setIsConfirm(false); };

    const handleUpdate = async () => {
        setIsConfirm(false);
        setIsLoading(true);
        try {
            const { data, error } = await updatePrivacy();
            if (data) {
                setSnackbarMessage({ type: 'success', message: 'Privacy updated successfully!' });
                setIsPrivateAccount(!isPrivateAccount);
            } else if (error) {
                setSnackbarMessage({ type: 'error', message: 'Failed to update privacy!' });
            }
        } catch (err) {
            setSnackbarMessage({ type: 'error', message: 'Unexpected error occurred!' });
        } finally {
            setIsLoading(false);
            setOpenSnackbar(true);
        }
    }

    const handleChangePrivateAccount = () => {
        setIsConfirm(true);
    };

    return (
        <Box sx={{ maxWidth: 700, height: '100vh', margin: '0 auto', p: 2, position: "relative", backgroundColor }}>
            <Typography sx={{ color: textColorPrimary, mt: '20px', fontSize: 20, fontWeight: 700 }}>
                {locales[lang]?.pricacy?.accountPrivacy}
            </Typography>

            <Box sx={{ mt: '20px', border: '0.5px solid gray', p: 2, borderRadius: '20px' }}>
                {isLoading
                    ? <Box sx={{ backgroundColor, width: 600, height: 171, display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><CircularProgress color="inherit" /></Box>
                    : (<>
                        <FormControlLabel
                            control={<Switch checked={isPrivateAccount} onChange={handleChangePrivateAccount} />}
                            labelPlacement="start"
                            sx={{ justifyContent: "space-between", width: "100%", ml: 0 }}
                            label={
                                <Typography sx={{ fontSize: "16px", fontWeight: 700, textTransform: "capitalize", color: textColorPrimary }}>
                                    {locales[lang]?.pricacy?.privateAccount}
                                </Typography>
                            }
                        />
                        <Typography variant="caption">
                            {locales[lang]?.pricacy?.caption}{" "}
                            <Typography sx={{ color: linkColor, fontSize: 14 }}>{locales[lang]?.learnMore}</Typography>
                        </Typography>
                    </>)}
            </Box>

            {isConfirm && <ModalConfimPricacy
                open={isConfirm}
                onClose={handleCloseConfirm}
                isPrivateAccount={isPrivateAccount}
                handleUpdate={handleUpdate}
            />}
        </Box>
    );
}
