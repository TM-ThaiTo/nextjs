'use client'
import { useMemo, useState } from "react";
import Image from "next/image";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AiOutlineSend } from "react-icons/ai";
import { FaFilm, FaPhotoVideo, FaVideo } from "react-icons/fa";
import { flex_justifyContent_spaceBetween_center, style_button_share_ui_create_post, style_button_ui_create_post, style_div_main_create_post, style_image, style_input } from './styles'
import { ModalCreatePost } from "../modal/create-post/modal.createPost";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import useWindowSize from "@/utils/hooks/hook-window-size";
import { createPostStatus } from "@/actions/post/actions";
import { getLanguage } from "@/helper/mapTypesLanguage";
import { locales } from '@/language/constant'

type Props = {
    user: any;
}

export default function UiCreatePost({ user }: Props) {
    const lang = getLanguage();
    const { theme, textColorPrimary, backgroundColor, actionHoverColor, actionActiveColor } = useThemeColors();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { width } = useWindowSize();
    const postWidth = useMemo(() => { if (isMobile) return '95vw'; return '600px'; }, [isMobile]);

    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [value, setValue] = useState<string>('');
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOpenModal = () => setIsOpenModal(true);
    const handleCloseModal = () => setIsOpenModal(false);
    const handleShare = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await createPostStatus({ content: value });
            if (error) { setSnackbarMessage({ type: 'error', message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!' }); setOpenSnackbar(true); }
            if (data) { setSnackbarMessage({ type: 'success', message: 'Đăng bài thành công!' }); setOpenSnackbar(true); setValue(''); }
        } catch (err) {
            setSnackbarMessage({ type: 'error', message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!' }); setOpenSnackbar(true);
        } finally { setIsLoading(false); }
    }

    return (
        <>
            <div style={{ ...style_div_main_create_post, width: postWidth, backgroundColor: backgroundColor }}>
                <div style={{ height: 110, width: '100%' }}>
                    <div style={{ height: 50, width: '100%', marginBottom: 10, ...flex_justifyContent_spaceBetween_center, }}>
                        <Image src={user?.avatar || '/static/avt_default.png'} width={40} height={40} objectFit="contain" alt="avatar" style={style_image} />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={lang === 'vi'
                                ? `${user?.fullName} ơi, bạn đang nghĩ gì thế?`
                                : `${locales[lang]?.action.whatOnYourMind}, ${user?.fullName}?`
                            }
                            style={{ ...style_input, backgroundColor: backgroundColor, color: textColorPrimary }}
                        />
                        {value && (
                            <IconButton onClick={handleShare}
                                sx={{
                                    ...style_button_share_ui_create_post,
                                    '&:hover': { backgroundColor: actionHoverColor, transition: 'background-color 0.3s ease' },
                                    '&:active': { backgroundColor: actionActiveColor, transition: 'background-color 0.3s ease' },
                                }}
                            >
                                {isLoading ? <CircularProgress size="25px" /> : <AiOutlineSend style={{ fontSize: 25, color: textColorPrimary }} />}
                            </IconButton>
                        )}
                    </div>
                    <hr style={{ border: '0.5px solid grey' }} />
                    <div style={{ ...flex_justifyContent_spaceBetween_center, height: 40, width: '100%', }}>
                        <Box sx={{
                            ...style_button_ui_create_post, color: '#f44336',
                            '&:hover': { backgroundColor: actionHoverColor, transition: 'background-color 0.3s ease' },
                            '&:active': { backgroundColor: actionActiveColor, transition: 'background-color 0.3s ease' },
                        }}>
                            <FaVideo style={{ marginRight: 5 }} />
                            {locales[lang]?.action.liveVideo}
                        </Box>
                        <Box onClick={handleOpenModal} sx={{
                            ...style_button_ui_create_post, color: '#4caf50',
                            '&:hover': { backgroundColor: actionHoverColor, transition: 'background-color 0.3s ease' },
                            '&:active': { backgroundColor: actionActiveColor, transition: 'background-color 0.3s ease' },
                        }}>
                            <FaPhotoVideo style={{ marginRight: 5 }} />
                            {locales[lang]?.action.photoVideo}
                        </Box>
                        <Box sx={{
                            ...style_button_ui_create_post, color: '#e91e63',
                            '&:hover': { backgroundColor: actionHoverColor, transition: 'background-color 0.3s ease' },
                            '&:active': { backgroundColor: actionActiveColor, transition: 'background-color 0.3s ease' },
                        }}>
                            <FaFilm style={{ marginRight: 5 }} />
                            {locales[lang]?.action.reel}
                        </Box>
                    </div>
                </div>
            </div>
            <ModalCreatePost myUser={user} open={isOpenModal} handleClose={handleCloseModal} />
        </>
    )
}