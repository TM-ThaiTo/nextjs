import React, { use, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import { createConversation } from '@/actions/chat/p2p/conversation/actions';
import { useRouter } from '@/utils/hooks/router/useRouter';
interface PopupProfileProps {
    dataInfo: any;
    user: any;
    authPost: any;
    handleFollow: () => void;
    isLoadingFollow: boolean;
}

const PopupProfile: React.FC<PopupProfileProps> = ({
    dataInfo,
    user,
    authPost,
    handleFollow,
    isLoadingFollow,
}) => {
    const router = useRouter();
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { borderColor, textColorPrimary, textColorSecondary, boxColor } = useThemeColors();
    const [loadingChat, setLoadingChat] = useState<boolean>(false);
    const handleMessage = async () => {
        try {
            setLoadingChat(true);
            const dataC = { idUser: user._id, }
            const { data, error } = await createConversation(dataC);

            if (data) {
                setLoadingChat(false);
                router.push(`/message/${data?.data?.slug}`);
            }
            if (error) {
                console.error(error);
                setLoadingChat(false);
            }
        } catch (err) {
            console.error(err);
            setLoadingChat(false);
        }
    }
    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: boxColor }}>
            <Box sx={{ display: 'flex', padding: '10px', height: 80 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href={`/${dataInfo?.user?.slug}`}>
                        <Avatar
                            src={user?.avatar || '/static/avt_default.png'}
                            alt='User'
                            sx={{
                                width: 60, height: 60, objectFit: 'cover',
                                border: `1px solid ${borderColor}`
                            }}
                        />
                    </Link>
                </Box>
                <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                    <Typography component="span" sx={{ fontSize: '20px', fontWeight: 700, color: textColorPrimary }}>
                        <Link href={`/${dataInfo?.user?.slug}/`} style={{ textDecoration: 'none', color: textColorPrimary }}>
                            @{dataInfo?.user?.slug}
                        </Link>
                    </Typography>
                    <Typography component="span" sx={{ fontSize: '15px', fontWeight: 500, color: textColorSecondary }}>{dataInfo?.user?.fullName}</Typography>
                </Box>
            </Box>

            <Box sx={{ height: 50, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Box>
                    <Typography component="span" style={{ display: 'flex', justifyContent: 'center', fontWeight: 700 }}>{dataInfo?.user?.posts}</Typography>
                    <Typography component="span" style={{ color: textColorPrimary, fontWeight: 500 }}>{locales[lang]?.profile?.postsPopup}</Typography>
                </Box>
                <Box>
                    <Typography component="span" style={{ display: 'flex', justifyContent: 'center', fontWeight: 700 }}>{dataInfo?.user?.follower}</Typography>
                    <Typography component="span" style={{ color: textColorPrimary, fontWeight: 500 }}>{locales[lang]?.profile?.followersPopup}</Typography>
                </Box>
                <Box>
                    <Typography component="span" style={{ display: 'flex', justifyContent: 'center', fontWeight: 700 }}>{dataInfo?.user?.following}</Typography>
                    <Typography component="span" style={{ color: textColorPrimary, fontWeight: 500 }}>{locales[lang]?.profile?.followingPopup}</Typography>
                </Box>
            </Box>

            <Box sx={{ height: 140 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '18px' }}>
                    {dataInfo?.post?.map((item: any, index: any) => {
                        const { listUrl, type } = item;
                        return (
                            <>
                                {type === 1 ?
                                    <React.Fragment key={index}>
                                        <Link href={`/post/${item?.slug}`}>
                                            <Image height={120} width={120} src={listUrl?.[0].url} alt="image" style={{ objectFit: 'cover' }} />
                                        </Link>
                                    </React.Fragment>
                                    : type === 2 ?
                                        <React.Fragment key={index}>
                                            <Link href={`/post/${item?.slug}`}>
                                                <Image height={120} width={120} src={listUrl?.[0].thumbnail} alt="image" style={{ objectFit: 'cover' }} />
                                            </Link>
                                        </React.Fragment>
                                        : <></>
                                }
                            </>
                        )
                    })}
                </Box>
            </Box>

            <Box sx={{ height: 55, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {authPost?.isMe ? (
                    <Button variant="contained" sx={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}>
                        <Link href={`/${user?.slug}`} style={{ textDecoration: 'none', color: 'black' }}>
                            {locales[lang]?.profile?.HOME}
                        </Link>
                    </Button>
                ) : (
                    <>
                        {authPost?.isFollow ? (
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Button variant="contained" onClick={handleMessage} sx={{ width: '50%', borderRadius: '10px', marginLeft: '5px', marginRight: '5px' }}>
                                    {loadingChat ? <CircularProgress size={24} /> : <>{locales[lang]?.profile?.Message}</>}
                                </Button>
                                <Button variant="outlined" sx={{
                                    width: '50%', borderRadius: '10px', border: 'none',
                                    color: 'white', marginLeft: '5px', marginRight: '5px', backgroundColor: 'gray'
                                }}>
                                    {isLoadingFollow ? <CircularProgress size={24} /> : <>{locales[lang]?.profile?.Following}</>}
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}
                                onClick={handleFollow}
                                disabled={isLoadingFollow}
                            >
                                {isLoadingFollow ? <CircularProgress size={24} /> : <>{locales[lang]?.profile?.Follow}</>}
                            </Button>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default PopupProfile;