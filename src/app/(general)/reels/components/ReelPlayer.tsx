'use client';

import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Link from 'next/link';

import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { style_action_like_comment, style_action_mute_pause, style_author_reel, style_box_video, style_main, } from './style'
import { action_AddFollow } from '@/actions/user/actions';
import AcctionReels from './actionReel';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import ModalComments from './modal.comment';

interface Props {
    data: any
    url: string;
    myUser: any;
}

const ReelPlayer = ({ url, data, myUser }: Props) => {
    const { auth, post, user, } = data;
    const { idUser } = post;
    const { isFollow, isMe } = auth;
    const lang = getLanguage();
    const { setSnackbarMessage, setOpenSnackbar } = useSnackbar();
    const { textColorSecondary, textColorPrimary, borderColor, linkColor } = useThemeColors();

    const [showSlider, setShowSlider] = useState(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(true);
    const [volume, setVolume] = useState<any>(0.5);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false);
    const [isFollowUser, setIsFollowUser] = useState<boolean>(isFollow);
    const [openCommentPopover, setOpenCommentPopover] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);

    const togglePlayPause = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setMuted(!muted);
    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
        if ((newValue as number) > 0) setMuted(false);
    };

    const renderDescription = () => (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <Typography variant="body1" sx={{ ml: 1 }}>
                <Box sx={{ m: '10px 0' }}>
                    {isExpanded
                        ? (<>
                            {post?.content}
                            <IconButton onClick={() => setIsExpanded(!isExpanded)} sx={{ ml: 1, p: 0, transition: 'transform 0.3s ease', color: textColorPrimary, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', }} >
                                <ExpandMoreIcon sx={{ fontSize: 25 }} />
                            </IconButton>
                        </>)
                        : (<>
                            {post?.content?.length > 50
                                ? `${post?.content?.substring(0, 30)}...`
                                : post?.content}
                            {post?.content?.length > 50 && (
                                <IconButton onClick={() => setIsExpanded(!isExpanded)} sx={{ ml: 1, p: 0, color: textColorPrimary, }} >
                                    <ExpandMoreIcon sx={{ fontSize: 25 }} />
                                </IconButton>
                            )}
                        </>)}
                </Box>
            </Typography>
        </Box>
    );

    const handleFollow = async () => {
        if (!myUser) { return; }
        const dataC = { id: myUser?.id, idFollow: idUser };
        setIsLoadingFollow(true);
        const { data, error } = await action_AddFollow(dataC);
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); setIsLoadingFollow(false); }
        if (data) { setIsFollowUser(true); setIsLoadingFollow(false) }
    };

    const renderFollowButton = () => {
        return (
            !isMe && !isFollowUser && (
                <>
                    <Typography component="span" variant="body1" sx={{ fontWeight: 700 }}>•</Typography>
                    {isLoadingFollow
                        ? <CircularProgress size={20} sx={{ ml: 1 }} />
                        : <Typography component="span" variant="body2" sx={{ fontWeight: 600, fontSize: 15, color: linkColor, cursor: 'pointer' }}>
                            <Box onClick={handleFollow}> follow </Box>
                        </Typography>
                    }
                </>
            ))
    };
    const handleCommentClick = () => setOpenCommentPopover(!openCommentPopover);

    return (
        <Box sx={style_main}>
            <Box sx={{ ...style_box_video, border: `1px solid ${borderColor}`, }}  >
                <ReactPlayer
                    width="100%" height="100%"
                    loop
                    style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
                    url={url} playing={isPlaying} controls={false} muted={muted} volume={volume}
                />

                <Box sx={{ ...style_action_mute_pause, color: textColorSecondary, }} >
                    <IconButton onClick={togglePlayPause} sx={{ color: '#fff' }}>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
                        onMouseEnter={() => setShowSlider(true)}
                        onMouseLeave={() => setShowSlider(false)}
                    >
                        <IconButton onClick={toggleMute} sx={{ color: '#fff' }}>
                            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </IconButton>
                        {showSlider && <Slider min={0} max={1} step={0.01} sx={{ color: '#fff', width: 100 }} value={volume} onChange={handleVolumeChange} />}
                    </Box>
                </Box>

                <Box sx={style_author_reel}>
                    <Link style={{ display: 'flex', alignItems: 'center', gap: 2, textDecoration: 'none', color: textColorPrimary }} href={`/${user?.slug}/reels`}>
                        <Avatar src={user?.avatart || '/static/avt_default.png'} alt="Author" sx={{ width: 32, height: 32 }} />
                        <Typography variant="body1" sx={{ ml: 1, fontSize: 14 }}>{user?.slug}</Typography>
                        {renderFollowButton()}
                    </Link>
                    <Box>{renderDescription()}</Box>
                </Box>
            </Box>

            <Box sx={style_action_like_comment} >
                <AcctionReels data={data} myUser={myUser} handleCommentClick={handleCommentClick} />
            </Box>

            {openCommentPopover && (
                <Box ref={boxRef} sx={{ width: 350, height: 760, borderRadius: '4px', boxShadow: 3, overflow: 'hidden', }} >
                    <ModalComments data={data} myUser={myUser} handleCommentClick={handleCommentClick} />
                </Box>
            )}
        </Box>
    );
};

export default ReelPlayer;
