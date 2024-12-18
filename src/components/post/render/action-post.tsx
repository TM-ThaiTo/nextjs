'use client'

import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import Share from '@mui/icons-material/Share'
import Typography from "@mui/material/Typography";
import { formatNumber } from "@/helper/formatNumber";
import { IOnePost } from "@/types/post";
import { action_AddLike, action_UnLike } from "@/actions/user/actions";
import ModalLogin from "@/components/auth/modal/modal-login";
import { ILikePost } from "@/components/user/types";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { locales } from '@/language/constant';
import { getLanguage } from "@/helper/mapTypesLanguage";
interface RenderActionProps {
    data: IOnePost,
    myUser: any;
}

export default function RenderActionLikeComment({ data, myUser }: RenderActionProps) {
    const lang = getLanguage();
    const { textColorPrimary } = useThemeColors();
    const { post, auth } = data;
    const [isLike, setIsLike] = useState<boolean>(auth?.isLike);
    const [likes, setLikes] = useState<number>(post?.likes || 0);
    const [dataPost, setDataPost] = useState<any>(post);
    const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
    const handleCloseModalLogin = () => setOpenModalLogin(false);

    const handleLikePost = async () => {
        if (!myUser) {
            setOpenModalLogin(true);
            return;
        }

        const input: ILikePost = { idUser: myUser?.id, idPost: post?._id };
        try {
            const previousLikes = likes;
            const previousIsLike = isLike;

            const newLikes = likes + (isLike ? -1 : 1);
            setLikes(newLikes);
            setIsLike(!isLike);
            setDataPost((prev: any) => ({ ...prev, likes: newLikes }));

            const { data, error } = isLike
                ? await action_UnLike(input)
                : await action_AddLike(input);
            if (error || !data) {
                setLikes(previousLikes);
                setIsLike(previousIsLike);
                setDataPost((prev: any) => ({ ...prev, likes: previousLikes }));
            }
        } catch (error) {
            console.error('error handleLikePost', error);
            setLikes(likes);
            setIsLike(isLike);
            setDataPost((prev: any) => ({ ...prev, likes }));
        }
    };

    const renderLikeCount = () => {
        if (auth?.isMe || !post?.hideLikes) return <Typography component="span" sx={{ fontWeight: 600 }}>{`${formatNumber(likes)} ${locales[lang]?.detailPost?.likes}`}</Typography>
        return <Typography component="span" sx={{ fontWeight: 600 }}>{locales[lang]?.detailPost?.hideLike}</Typography>;
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleLikePost} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0px' }}>
                    {isLike ? <Favorite sx={{ fontSize: 30, color: 'red' }} /> : <FavoriteBorder sx={{ fontSize: 30, color: textColorPrimary }} />}
                </IconButton>
                <Link href={`/post/${dataPost?.slug}`}>
                    <IconButton>
                        <ChatBubbleOutline sx={{ fontSize: 30, color: textColorPrimary }} />
                    </IconButton>
                </Link>
                <IconButton><Share sx={{ fontSize: 30, color: textColorPrimary }} /></IconButton>
            </Box>
            <Box sx={{ pt: 1 }}>{renderLikeCount()}</Box>
            <ModalLogin open={openModalLogin} handleClose={handleCloseModalLogin} />
        </>
    )
}