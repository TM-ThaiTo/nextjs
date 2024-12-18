'use client'

import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import { commonStyles, titleStyle } from '@/style/style_mui/app.modalStyle'
import { modalStyle } from "@/style/style_mui/app.modalStyle";
import Dropzone from '@/components/modal/create-post/modal.dropzone'
import ModalCropMedia from '@/components/modal/create-post/crop/modal.crop'
import { MediaFile } from "@/types/post";
import { locales } from "@/language/constant";
import { getLanguage } from "@/helper/mapTypesLanguage";

type Props = {
    myUser: any;
    open: boolean;
    handleClose: () => void;
}

export const ModalCreatePost = ({ open, handleClose, myUser }: Props) => {
    const lang = getLanguage();
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [isCreateMedia, setIsCreatMedia] = useState<boolean>(true);
    const [isCropMedia, setIsCropMedia] = useState<boolean>(false);

    useEffect(() => {
        if (mediaFiles?.length > 0) {
            setIsCreatMedia(false);
            setIsCropMedia(true);
        }
    }, [mediaFiles])

    const handleModalClose = () => setConfirmOpen(true);
    const handleConfirmClose = async () => {
        setConfirmOpen(false);
        handleBackCreateMedia();
        handleClose();
    };

    const createMediaFile = () => {
        return (
            <Box sx={{ height: 853, width: '100%' }}>
                <Box sx={{ height: 40, borderBottom: "1px solid gray" }}>
                    <Box sx={commonStyles}>
                        <Typography sx={titleStyle}>{locales[lang]?.actionHome?.createPost}</Typography>
                    </Box>
                </Box>
                <Box sx={{ height: 800 }}>
                    <Dropzone setMediaFiles={setMediaFiles} lang={lang} />
                </Box>
            </Box >
        )
    }

    const handleBackCreateMedia = () => {
        setMediaFiles([]);
        setIsCreatMedia(true);
        setIsCropMedia(false);
    }
    return (
        <>
            <Modal open={open} onClose={handleModalClose} aria-labelledby="create-post-modal-title" aria-describedby="create-post-modal-description">
                <Box sx={modalStyle}>
                    {isCreateMedia && createMediaFile()}
                    {isCropMedia &&
                        <ModalCropMedia
                            myUser={myUser}
                            mediaFiles={mediaFiles}
                            handleBackCreateMedia={handleBackCreateMedia}
                        />
                    }
                </Box>
            </Modal>

            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 200, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                            <Typography id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>Discard post?</Typography>
                            <Typography id="confirm-close-modal-description" style={{ margin: 0, color: 'gray', fontSize: 15, fontWeight: 600 }}>If you leave, your edits won`t be saved.</Typography>
                        </Box>
                        <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', height: '25%', display: 'flex', justifyContent: 'center' }}>
                            <ButtonBase onClick={handleConfirmClose} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Discard</ButtonBase>
                        </Box>
                        <Box sx={{ height: '25%', display: 'flex', justifyContent: 'center' }}>
                            <ButtonBase onClick={() => setConfirmOpen(false)} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Cancel</ButtonBase>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
