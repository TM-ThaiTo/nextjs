import { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { AiOutlineComment } from "react-icons/ai";

import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { formatNumber } from "@/helper/formatNumber";
import { ModalHandlePost } from "@/components/modal/handle-post/render/render-actions";
import { action_AddLike, action_UnLike } from "@/actions/user/actions";

interface Props {
    data: any;
    myUser: any;
    handleCommentClick: () => void;
}

const style_icon = { fontSize: 30 };
const style_box_icon = { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", };
const style_text_like_comments = { fontWeight: 700, fontSize: 15 };

export default function AcctionReels({ data, myUser, handleCommentClick }: Props) {
    const [dataItem, setDataItem] = useState<any>(data);
    const { auth, post } = dataItem;
    const { isLike } = auth;
    const { hideLike, likes, comments } = post;
    const { textColorPrimary } = useThemeColors();

    const [isLikePost, setIsLikePost] = useState<boolean>(auth?.isLike);
    const [totalLikes, setTotalLike] = useState<number>(likes || 0);
    const [openModalPost, setOpenModalPost] = useState<boolean>(false);
    const commentButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleCloseModal = () => setOpenModalPost(false);
    const handleOpenModal = () => setOpenModalPost(true);

    const handleLikePost = async () => {
        if (!myUser) { return; }
        const input = { idUser: myUser?.id, idPost: post?._id, }
        try {
            const { data, error } = isLikePost
                ? await action_UnLike(input) :
                await action_AddLike(input);

            if (error || !data) return;
            const newLikes = totalLikes + (isLikePost ? -1 : 1);
            setTotalLike(newLikes);
            setIsLikePost(!isLikePost);
        } catch (error) { console.error('error handleLikePost', error); }
    };
    return (
        <>
            <Box sx={style_box_icon}>
                <IconButton sx={{ color: textColorPrimary }} onClick={handleLikePost}>
                    {isLikePost
                        ? <FavoriteIcon sx={{ color: "red", ...style_icon }} />
                        : <FavoriteBorderIcon sx={style_icon} />
                    }
                </IconButton>
                {!hideLike && (
                    <Typography sx={style_text_like_comments}>
                        {formatNumber(totalLikes)}
                    </Typography>
                )}
            </Box>
            <Box sx={style_box_icon} >
                <IconButton ref={commentButtonRef} onClick={handleCommentClick} sx={{ color: textColorPrimary }} >
                    <AiOutlineComment style={style_icon} />
                </IconButton>
                <Typography sx={style_text_like_comments}>{comments}</Typography>
            </Box>
            <IconButton sx={{ color: textColorPrimary }}>
                <ShareIcon sx={style_icon} />
            </IconButton>
            <IconButton sx={{ color: textColorPrimary }}>
                <BookmarkBorderIcon sx={style_icon} />
            </IconButton>
            <IconButton sx={{ color: textColorPrimary }} onClick={handleOpenModal}>
                <MoreHorizIcon sx={style_icon} />
            </IconButton>
            {openModalPost && (
                <ModalHandlePost
                    open={openModalPost}
                    handleClose={handleCloseModal}
                    data={data}
                    setDataPost={setDataItem}
                    myUser={myUser}
                />
            )}
        </>
    );
}
