'use client'

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CustomAlert } from "@/helper/custom_alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import Link from "next/link";
import ReportModal from "@/components/report/report.modal";
import {
    handleDeletePost, handleEditPost, handleLikePost, handleCommentPost, handleAboutAccount, handlePublicPost,
    handleFollow, handleAddFavorites, handleSharePost, handleCopyLink, handleEmbed
} from '@/components/modal/handle-post/handle/index';
import { IOnePost } from "@/types/post";
import { actionAuthors, actionCustomers, buttonStyles, modalStyle } from '@/components/modal/handle-post/setting/index';
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage, mapLanguage } from "@/helper/mapTypesLanguage";
import { locales } from "@/language/constant";

type EditPostProps = {
    myUser: any;
    open: boolean;
    handleClose: () => void;
    data: IOnePost,
    setDataPost: Dispatch<SetStateAction<any>>

}

export const ModalHandlePost = ({ myUser, open, handleClose, data, setDataPost }: EditPostProps) => {
    const lang = getLanguage();
    const { textColorPrimary } = useThemeColors();
    const [infoData, setData] = useState<IOnePost>(data);
    const { post, user, auth } = infoData;
    const [alert, setAlert] = useState<any>({ open: false, type: 'info', message: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [isReport, setIsReport] = useState<boolean>(false);
    const openModalConfirmDelete = () => setOpenConfirmDelete(true);
    const closeModalConfirmDelete = () => setOpenConfirmDelete(false);

    const renderLinkPost = (item: any) => {
        return (
            <Typography sx={{ ...buttonStyles, color: textColorPrimary }}>
                <Link href={post?.type === 3 ? `/post/status/${post?.slug}` : `/post/${post?.slug}`} style={{ textDecoration: 'none', color: textColorPrimary }}>
                    {item?.label}
                </Link>
            </Typography>
        )
    }


    const renderButtonAction = (item: any, handler: any) =>
        <Button sx={{ height: 50, color: textColorPrimary, textTransform: 'none' }} onClick={handler}>
            <Typography sx={{ ...buttonStyles, color: item?.color }}>
                {item?.type_action ? (
                    <>
                        {[1, 2, 3].includes(item?.type_action) && (
                            <>
                                {auth?.isMe
                                    && ((item?.type_action === 1 && post?.hideLikes) ||
                                        (item?.type_action === 2 && post?.openComment) ||
                                        (item?.type_action === 3 && post?.openPublic))
                                    ? item?.label : item?.label1
                                }
                            </>
                        )}
                    </>
                ) : (item?.label)}
            </Typography>
        </Button>

    const handleCloseModal = () => {
        setIsReport(false);
        closeModalConfirmDelete();
        handleClose();
    }

    const handleReportPost = () => { setIsReport(true); }

    const actionHandlersAuthor: Record<string, (data: any, setAlert: any, handleCloseModal: any, setIsLoading: any, setDataPost: any, setData: any) => void> = {
        handleDeletePost: () => openModalConfirmDelete(),
        handleLikePost: (data) => handleLikePost(data, setAlert, handleCloseModal, setIsLoading, setData),
        handleCommentPost: (data) => handleCommentPost(data, setAlert, handleCloseModal, setIsLoading, setData),
        handlePublicPost: (data) => handlePublicPost(data, setAlert, handleCloseModal, setIsLoading, setData, setDataPost),
        handleEditPost: (data) => handleEditPost(data),
        handleAboutAccount: (data) => handleAboutAccount(data),
    };
    const renderActionAuthor = () =>
        <>
            {actionAuthors(lang)?.map((item, index) => {
                const handler = item?.handle
                    ? () => actionHandlersAuthor[item.handle](data, setAlert, handleCloseModal, setIsLoading, setDataPost, setData)
                    : undefined;
                return (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        {item?.type === 1 && renderLinkPost(item)}
                        {item?.type === 2 && renderButtonAction(item, handler)}
                    </div>
                );
            })}
        </>

    const actionHandlersCustomer: Record<string, (data: any, setAlert: any, handleCloseModal: any, setIsLoading: any, setDataPost: any, setData: any) => void> = {
        handleReportPost: () => handleReportPost(),
        handleFollow: () => handleFollow(),
        handleAddFavorites: () => handleAddFavorites(),
        handleSharePost: () => handleSharePost(),
        handleCopyLink: () => handleCopyLink(),
        handleEmbed: () => handleEmbed(),
    }
    const renderActionCustomer = () => {
        return (
            <>
                {actionCustomers?.map((item, index) => {
                    const handler = item?.handle
                        ? () => actionHandlersCustomer[item.handle](data, setAlert, handleCloseModal, setIsLoading, setDataPost, setData)
                        : undefined;

                    return (
                        <div key={index} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            {item?.type === 1 && renderLinkPost(item)}
                            {item?.type === 2 && renderButtonAction(item, handler)}
                        </div>
                    );
                })}
            </>
        );
    };
    return (
        <>
            <Modal open={open} onClose={handleCloseModal} disableScrollLock aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    {isReport && <ReportModal type={1} post={post} myUser={myUser} userBlock={user} handleClose={handleCloseModal} />}

                    {!isReport && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            {isLoading
                                ? <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}><CircularProgress /></Box>
                                : <>{auth?.isMe ? renderActionAuthor() : renderActionCustomer()}</>
                            }
                            <Button sx={{ height: 50, color: textColorPrimary, textTransform: 'none' }} onClick={handleClose}> <Typography sx={buttonStyles}>Cancel</Typography></Button>
                        </Box>
                    )}
                </Box>
            </Modal>

            <Modal open={openConfirmDelete} onClose={closeModalConfirmDelete} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 200, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                            <span id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>{locales[mapLanguage(lang)]?.titleDeletePost}</span>
                            <span id="confirm-close-modal-description" style={{ margin: 0, color: 'gray', fontSize: 15, fontWeight: 600 }}>{locales[mapLanguage(lang)]?.areYouSureDeletePost}</span>
                        </div>
                        <div style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', height: '25%', display: 'flex', justifyContent: 'center' }}>
                            <ButtonBase onClick={() => handleDeletePost(data, setAlert, handleCloseModal, setIsLoading)} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }} >
                                {locales[mapLanguage(lang)]?.discardDeletePost}
                            </ButtonBase>
                        </div>
                        <div style={{ height: '25%', display: 'flex', justifyContent: 'center' }}>
                            <ButtonBase onClick={closeModalConfirmDelete} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }} >
                                {locales[mapLanguage(lang)]?.cancel}
                            </ButtonBase>
                        </div>
                    </div>
                </Box>
            </Modal>

            <CustomAlert alert={alert} setAlert={setAlert} />
        </>
    )
}