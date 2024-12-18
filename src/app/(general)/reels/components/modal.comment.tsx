import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import RenderComment from "./renderComment";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { action_GetCommentBySlugPost } from "@/actions/post/comment";
import { locales } from "@/language/constant";
import { getLanguage } from "@/helper/mapTypesLanguage";

interface Props {
    data: any;
    myUser: any;
    handleCommentClick: () => void;
}

export default function ModalComments({ data, myUser, handleCommentClick }: Props) {
    const { post } = data;
    const { actionHoverColor, textColorPrimary, boxColor } = useThemeColors();
    const lang = getLanguage();
    const [comments, setComments] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            const { data, error } = await action_GetCommentBySlugPost(post?.slug, 1, 10);
            if (error) setComments([]);
            if (data) setComments(data?.data);
            setLoading(false);
        };
        fetchComments();
    }, [post?.slug]);

    return (
        <>
            <Box sx={{ backgroundColor: boxColor }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, height: 70 }}>
                    <IconButton onClick={handleCommentClick} sx={{ color: textColorPrimary, '&:hover': { backgroundColor: actionHoverColor } }} >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" gutterBottom sx={{ mr: '40px' }}>
                        {locales[lang]?.reels?.comment}
                    </Typography>
                    <div />
                </Box>

                <Box sx={{ height: '100%', maxHeight: 630, }}>
                    {loading ? (
                        <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", }} >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {comments && (
                                <>
                                    {post?.openComment ? (
                                        <RenderComment data={data} comments={comments} myUser={myUser} />
                                    ) : (
                                        <Box sx={{ textAlign: "center", color: "gray", marginTop: 20, }} >
                                            {locales[lang]?.detailPost?.noPublicComment}
                                        </Box>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
}
