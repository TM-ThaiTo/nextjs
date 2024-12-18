'use client';

import { ModalCreatePost } from "@/components/modal/create-post/modal.createPost";
import Button from "@mui/material/Button";
import { useState } from "react";
import GridOffIcon from '@mui/icons-material/GridOff';
import Typography from '@mui/material/Typography';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type Props = {
    myUser: any;
    type?: number;
}
export default function NoPostNotification({ myUser, type }: Props) {
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { textColorPrimary, textColorSecondary, actionHoverColor, tooltipBackgroundColor, toolTipTextColor } = useThemeColors();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div style={{ width: '100%', height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid ${textColorPrimary}`, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <GridOffIcon sx={{ fontSize: 70, border: '1px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 120, }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorPrimary }}>
                        {type === 1
                            ? <>{locales[lang]?.profile?.noPost}</>
                            : <>{locales[lang]?.notificationPage?.post?.noPost}</>
                        }
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorSecondary, maxWidth: 400, mt: 1, textAlign: 'center', }}>
                        {type === 1
                            ? <>{locales[lang]?.profile?.startPost}</>
                            : <>{locales[lang]?.notificationPage?.post?.startPost}</>
                        }
                    </Typography>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onClick={handleOpen}
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        mt: 2, background: 'none',
                        width: 200,
                        height: 50,
                        borderRadius: '10px',
                        backgroundColor: tooltipBackgroundColor,
                        color: toolTipTextColor,
                        '&:hover': {
                            backgroundColor: actionHoverColor,
                        }
                    }}
                >
                    {locales[lang]?.notificationPage?.post?.createPost}
                </Button>
            </div>
            {open && <ModalCreatePost open={open} handleClose={handleClose} myUser={myUser} />}
        </>
    )
}