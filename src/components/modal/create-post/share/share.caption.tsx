import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@mui/material/Input';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LockIcon from '@mui/icons-material/Lock';

import { EmojiPickerPopup } from '@/helper/emoji';
import { blobToFile, convertBase64ImageToBlob, convertBlobToBase64 } from '@/helper/conver_blob_base64_file';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { fImageFile, fMediaFiles, fVideoFile } from '@/types/post';

import InputShareLocation from './share.location';
import InputShareCollabrator from './share.collab';
import { locales } from '@/language/constant';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { action_createPostImage, action_createPostVideo } from '@/actions/post/actions';

type Props = { myUser: any; finalMediaShare: fMediaFiles; onSharePost: boolean; }
type AltText = { file: fImageFile; accessibility: string; }
type AltTextVideos = { file: any; accessibility: string; }[]

const boxMain = {
    height: 860,
    width: 1150,
    borderBottom: "1px solid gray",
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',  // Đảm bảo căn giữa hoàn toàn
    zIndex: 1000,  // Đặt zIndex cao để hiện trên tất cả
    backgroundColor: 'white',  // Thêm màu nền để phân biệt rõ
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Thêm bóng đổ để nổi bật hơn
    padding: '10px',  // Thêm padding cho nội dung
    textAlign: 'center',  // Căn giữa nội dung văn bản
    borderRadius: '8px',  // Bo góc box cho đẹp hơn
}

export default function ShareCaption({ myUser, finalMediaShare, onSharePost }: Props) {
    const { textColorPrimary, borderColor, linkColor, textColorSecondary } = useThemeColors();
    const { slug, avatar, _id: id } = myUser;
    const lang = getLanguage();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [textCaption, setTextCaption] = useState<string>('');
    const [textLocation, setTextLocation] = useState<string>('');
    const [textCollabrator, setTextCollabrator] = useState<string>('');
    const [statusPost, setStatusPost] = useState<number>(1);
    const [hideLikes, setHideLikes] = useState<boolean>(false);
    const [turnOffComments, setTurnOffComments] = useState(false);
    const [isOpenAdvancedSettings, setIsOpenAddvancedSettings] = useState<boolean>(false);
    const [isOpenAccessibility, setIsOpenAccessibility] = useState<boolean>(false);
    const [altText, setAltText] = useState<AltText[]>([]);
    const [altTextVideo, setAltTextVideo] = useState<AltTextVideos>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleHideLikesChange = useCallback(() => setHideLikes(!hideLikes), [hideLikes]);
    const handleTurnOffCommentsChange = useCallback(() => setTurnOffComments(!turnOffComments), [turnOffComments]);
    const handleIsOPenAdvancedSettings = useCallback(() => setIsOpenAddvancedSettings(!isOpenAdvancedSettings), [isOpenAdvancedSettings]);
    const handleIsOpenAccessibility = useCallback(() => setIsOpenAccessibility(!isOpenAccessibility), [isOpenAccessibility]);

    const handleChangeCaption = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTextCaption(e.target.value), []);
    const handleEmojiSelect = useCallback((emoji: string) => setTextCaption(textCaption + emoji), [textCaption]);
    const handleChangeStatus = useCallback((event: SelectChangeEvent<number>) => setStatusPost(Number(event.target.value)), []);

    const handleDataSharePostImage = useCallback(async () => {
        const listUrlImage = await Promise.all(
            finalMediaShare
                .filter((item) => item.type === 'image')
                .map(async (item) => {
                    const file = item?.file as fImageFile;
                    const urlBase64 = await convertBlobToBase64(file?.url);
                    return {
                        file: {
                            url: urlBase64,
                            base64: file?.base64,
                        },
                        accessibility: '',
                    };
                })
        );
        setAltText(listUrlImage);
    }, [finalMediaShare, setAltText]);

    const handleDataSharePostVideo = useCallback(async () => {
        const listUrlVideos = await Promise.all(
            finalMediaShare
                .filter((item) => item.type === 'video')
                .map(async (item) => {
                    const file = item?.file as fVideoFile;
                    const { thumbnails, ...restFile } = file || {};
                    const thumbnail = file?.thumbnail ? file.thumbnail : thumbnails?.[0];

                    return {
                        file: {
                            ...restFile,
                            thumbnail: thumbnail,
                        },
                        accessibility: '',
                    };
                })
        );
        setAltTextVideo(listUrlVideos);
    }, [finalMediaShare, setAltTextVideo]);

    useEffect(() => {
        const processData = async () => {
            if (altText.length === 0 && finalMediaShare.length > 0 && finalMediaShare[0].type === 'image') {
                await handleDataSharePostImage();
            }
            if (altTextVideo.length === 0 && finalMediaShare.length > 0 && finalMediaShare[0].type === 'video') {
                await handleDataSharePostVideo();
            }
        }
        processData();
    }, [altText, altTextVideo, finalMediaShare, handleDataSharePostImage, handleDataSharePostVideo]);

    const resizeAndCropThumbnail = useCallback(async (thumbnail: string, width: number, height: number): Promise<string> => {
        let thumbnailBase64 = thumbnail;

        // Nếu thumbnail là một blob URL, convert nó sang base64
        if (thumbnailBase64.startsWith("blob:")) {
            thumbnailBase64 = await convertBlobToBase64(thumbnailBase64);
        }

        // Tạo một image từ base64
        const image = new Image();
        image.src = thumbnailBase64;

        // Đợi cho hình ảnh load
        await new Promise<void>((resolve) => {
            image.onload = () => resolve();
        });

        // Tạo một canvas để cắt ảnh
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // Vẽ ảnh lên canvas và cắt nó theo kích thước
        if (ctx) {
            ctx.drawImage(image, 0, 0, width, height);
        }

        // Chuyển đổi canvas về base64
        return canvas.toDataURL();
    }, []);

    const handleDataVideo = useCallback(async () => {
        const dataVideoFix = await Promise.all(altTextVideo.map(async (item) => {
            const file = item.file;
            const { timeEnd, timeStart, url, thumbnail, size, soundOn } = file;
            const aspectRatio = size;
            const baseWidth = 1280;
            const width = baseWidth;
            const height = baseWidth / aspectRatio;

            let thumbnailBlob = thumbnail;
            if (thumbnailBlob.startsWith("data:image/")) {
                thumbnailBlob = convertBase64ImageToBlob(thumbnailBlob);
            }

            const accessibility = item?.accessibility;

            const data = {
                thumbnail: thumbnailBlob,
                file: {
                    soundOn: soundOn,
                    timeEnd: timeEnd,
                    timeStart: timeStart,
                    url: url,
                    width: width,
                    height: height,
                },
                accessibility: accessibility,
            };
            return data;
        }));

        return dataVideoFix;
    }, [altTextVideo]);

    const processData = useCallback(async () => {
        const type: number = finalMediaShare[0].type === 'image' ? 1 : 2;
        const title = finalMediaShare[0].type;

        if (type === 1) {
            const dataImage = {
                idUser: id,
                status: statusPost,
                type: type,
                title: title,
                content: textCaption,
                location: textLocation,
                collab: textCollabrator,
                hideLikes: hideLikes,
                openComment: !turnOffComments,
                tag: [],
                listUrl: altText,
            };
            return dataImage;
        } else if (type === 2) {
            const dataVideoFix = await handleDataVideo();
            const dataVideo = {
                idUser: id,
                status: statusPost,
                type: type,
                title: title,
                content: textCaption,
                location: textLocation,
                collab: textCollabrator,
                hideLikes: hideLikes,
                openComment: !turnOffComments,
                tag: [],
                listUrl: dataVideoFix,  // Sử dụng listUrl từ handleDataVideo
            };
            return dataVideo;
        }
    }, [finalMediaShare, id, statusPost, textCaption, textLocation, textCollabrator, hideLikes, turnOffComments, altText, handleDataVideo]);

    const handleUploadImage = useCallback(async (data: any) => {
        const uploadImageAsync = async () => {
            try {
                setIsLoading(true);
                const { error } = await action_createPostImage(data);
                if (error) {
                    setSnackbarMessage({ type: 'error', message: 'Lỗi tạo bài viết' });
                    setOpenSnackbar(true);
                    setIsLoading(false); return;
                }
                else if (!error) { setIsLoading(false); setIsSuccess(true); }
            } catch (error) { console.error('Error during image upload:', error); }
        };
        uploadImageAsync();
    }, [setIsLoading, setIsSuccess, setOpenSnackbar, setSnackbarMessage]);

    const handleUploadVideo = useCallback(async (data: any) => {
        setIsLoading(true);
        const formData = new FormData();
        const { idUser, status, type, title, content, location, collab, hideLikes, openComment, tag, listUrl, soundOn } = data;
        const url = listUrl[0];
        if (!url?.file?.url) { console.error("No video file found"); return; }

        const videoFile = await blobToFile(url.file.url, 'video.mp4');
        const thumbnailFile = await blobToFile(url.thumbnail, 'thumbnail.jpg');

        formData.append('files', videoFile);
        formData.append('files', thumbnailFile);
        formData.append('idUser', idUser);
        formData.append('status', status.toString());
        formData.append('type', type.toString());
        formData.append('title', title);
        formData.append('content', content || '');
        formData.append('location', location || '');
        formData.append('collab', collab || '');
        formData.append('hideLikes', hideLikes.toString());
        formData.append('openComment', openComment.toString());
        formData.append('tag', tag || '');
        formData.append('url[thumbnail]', url?.thumbnail);
        formData.append('url[file][soundOn]', url?.file?.soundOn?.toString());
        formData.append('url[file][timeStart]', url?.file?.timeStart?.toString());
        formData.append('url[file][timeEnd]', url?.file?.timeEnd?.toString());
        formData.append('url[file][width]', url?.file?.width?.toString());
        formData.append('url[file][height]', url?.file?.height?.toString());
        formData.append('url[accessibility]', url?.accessibility);

        try {
            const { data, error } = await action_createPostVideo(formData);
            if (error) {
                setSnackbarMessage({ type: 'error', message: 'Lỗi tạo bài viết' }); setOpenSnackbar(true); setIsLoading(false);
            } else if (!error) { setIsLoading(false); setIsSuccess(true); }
        } catch (error) {
            console.error('Error during video upload:', error);
        }
    }, [setIsLoading, setIsSuccess, setOpenSnackbar, setSnackbarMessage]);

    const handleUpload = useCallback(async () => {
        try {
            const data = await processData();
            if (data && data.type === 1) {
                await handleUploadImage(data);
            } else if (data && data.type === 2) {
                await handleUploadVideo(data);
            }
        } catch (error) { console.error('handleUpload error, ', error); }
    }, [processData, handleUploadImage, handleUploadVideo]);

    useEffect(() => {
        if (onSharePost) {
            handleUpload();
        }
    }, [onSharePost, handleUpload]);

    const renderUserAvatar = () => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
                <Box>
                    <Avatar src={avatar || '/static/avt_default.png'} alt="User Avatar" sx={{ width: 55, height: 55, mr: 2, border: `1px solid ${borderColor}` }} />
                </Box>
                <Box>
                    <Box sx={{ height: 30, display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 600, color: textColorPrimary }}>{slug}</Typography>
                    </Box>

                    <Box sx={{ height: 30, width: 220, display: 'flex', alignItems: 'center' }}>
                        <FormControl variant="outlined" sx={{ minWidth: 120, height: 30 }}>
                            <Select
                                sx={{ height: 30 }} value={statusPost}
                                onChange={handleChangeStatus} displayEmpty
                                input={<OutlinedInput notched={true} />}
                                IconComponent={() => <ArrowDropDownIcon />}
                                renderValue={(selected) => {
                                    switch (selected) {
                                        case 1:
                                            return (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <PublicIcon sx={{ mr: 1, color: textColorPrimary }} />
                                                    <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.public}</Typography>
                                                </Box>
                                            );
                                        case 2:
                                            return (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <LockIcon sx={{ mr: 1, color: textColorPrimary }} />
                                                    <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.onlyMe}</Typography>
                                                </Box>
                                            );
                                        case 3:
                                            return (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <GroupIcon sx={{ mr: 1, color: textColorPrimary }} />
                                                    <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.followYou}</Typography>
                                                </Box>
                                            );
                                        default: return <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.onlyMe}</Typography>;
                                    }
                                }}
                            >
                                <MenuItem value={1}>
                                    <ListItemIcon sx={{ color: textColorPrimary }}><PublicIcon /></ListItemIcon>
                                    <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.public}</Typography>
                                </MenuItem>
                                <MenuItem value={2}>
                                    <ListItemIcon sx={{ color: textColorPrimary }}><LockIcon /></ListItemIcon>
                                    <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.onlyMe}</Typography>
                                </MenuItem>
                                <MenuItem value={3}>
                                    <ListItemIcon sx={{ color: textColorPrimary }}><GroupIcon /></ListItemIcon>
                                    <Typography sx={{ color: textColorPrimary }}>{locales[lang]?.followYou}</Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        )
    };

    const renderInputCaption = () => (
        <Box sx={{ height: 280 }}>
            <Box sx={{ height: 'auto', maxHeight: 250, padding: 0, display: 'flex', flexDirection: 'column' }}>
                <TextField fullWidth multiline rows={10} sx={{ border: 'none' }} variant="standard" inputProps={{ maxLength: 2000 }} placeholder={locales[lang]?.writeACaption} value={textCaption} onChange={handleChangeCaption} />
            </Box>
            <Box sx={{ height: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <EmojiPickerPopup onEmojiSelect={handleEmojiSelect} />
                <Typography variant="caption" color={textColorPrimary}>
                    {textCaption.length} / 2000
                </Typography>
            </Box>
        </Box>
    );

    const handleAltTextChange = useCallback((index: number, value: string, type: 'image' | 'video') => {
        if (type === 'image') {
            const updatedAltText = [...altText];
            updatedAltText[index] = { ...updatedAltText[index], accessibility: value };
            setAltText(updatedAltText);
        } else if (type === 'video') {
            const updatedAltTextVideo = [...altTextVideo];
            updatedAltTextVideo[index] = { ...updatedAltTextVideo[index], accessibility: value };
            setAltTextVideo(updatedAltTextVideo);
        }
    }, [altText, altTextVideo]);

    const renderAltTextForMedia = () => (
        <Box sx={{ width: '100%' }}>
            {finalMediaShare.length > 0 && (
                <>
                    {finalMediaShare.map((item, index) => {
                        if (item.type === 'image') {
                            const file = item?.file as fImageFile;
                            const url = file?.base64 || file?.url;
                            return (
                                <Box key={index}>
                                    <Box sx={{ display: 'flex', height: 68, alignItems: 'center' }}>
                                        <Box component='img' src={url} sx={{ height: 44, width: 44, objectFit: 'contain' }} />
                                        <Box sx={{ paddingLeft: '20px', width: '100%' }}>
                                            <Input
                                                placeholder={locales[lang]?.altText}
                                                fullWidth={true} sx={{ height: 44 }}
                                                value={item.type === 'image' ? altText[index]?.accessibility : altTextVideo[index]?.accessibility}
                                                onChange={(e) => handleAltTextChange(index, e.target.value, item.type)}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        } else if (item.type === 'video') {
                            const file = item?.file as fVideoFile;
                            const thumbnail = file?.thumbnail;
                            const thumbnails = file?.thumbnails;
                            return (
                                <Box key={index}>
                                    <Box sx={{ display: 'flex', height: 68, alignItems: 'center' }}>
                                        <Box component='img' src={thumbnail || thumbnails[0]} sx={{ height: 44, width: 44, objectFit: 'contain' }} />
                                        <Box sx={{ paddingLeft: '20px', width: '100%' }}>
                                            <Input
                                                placeholder={locales[lang]?.altText}
                                                fullWidth={true}
                                                sx={{ height: 44 }}
                                                value={item.type === 'video' ? altText[index]?.accessibility : altTextVideo[index]?.accessibility}
                                                onChange={(e) => handleAltTextChange(index, e.target.value, item.type)}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                    })}
                </>
            )}
        </Box>
    );

    const renderAction = () => (
        <Box sx={{ width: 338, maxHeight: 800, height: '100%', overflowY: 'scroll', pl: 2, pr: 2 }}>
            {renderUserAvatar()}
            {renderInputCaption()}
            <Box sx={{ height: 45 }}> <InputShareLocation setTextLocation={setTextLocation} /> </Box>
            <Box sx={{ height: 45 }}> <InputShareCollabrator setTextCollabrator={setTextCollabrator} /> </Box>

            <Box sx={{ minHeight: 45, height: 'auto' }}>
                <Box sx={{ display: 'flex', height: 45, alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={handleIsOpenAccessibility}>
                    <Typography sx={{ fontWeight: isOpenAccessibility ? 1000 : 400 }}>
                        {locales[lang]?.accessibility}
                    </Typography>
                    <ExpandMoreIcon sx={{ transform: isOpenAccessibility ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', }} />
                </Box>
                {isOpenAccessibility && renderAltTextForMedia()}
            </Box>

            <Box sx={{ minHeight: 45, height: 'auto' }}>
                <Box sx={{ display: 'flex', height: 45, alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={handleIsOPenAdvancedSettings}>
                    <Typography sx={{ fontWeight: isOpenAdvancedSettings ? 1000 : 400, }}>{locales[lang]?.advancedSettings}</Typography>
                    <ExpandMoreIcon sx={{ transform: isOpenAdvancedSettings ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', }} />
                </Box>

                {isOpenAdvancedSettings && (
                    <>
                        <Box sx={{ alignItems: 'center', width: '100%', height: 132 }}  >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '14px', width: 250 }}>
                                    {locales[lang]?.hideLikeAndViewCountsOnThisPost}
                                </Typography>
                                <Switch checked={hideLikes} onChange={handleHideLikesChange} sx={{ color: 'white' }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: textColorSecondary, fontSize: '12px', fontWeight: 600 }}>
                                {locales[lang]?.captionHideLikeAndViewCountsOnThisPost} <Link href="#" sx={{ color: linkColor, textDecoration: 'none' }}>  {locales[lang]?.learnMore}</Link>
                            </Typography>
                        </Box>

                        <Box sx={{ alignItems: 'center', width: '100%', height: 132, marginTop: '5px' }}  >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '14px', width: 250 }}>
                                    {locales[lang]?.turnOffCommenting}
                                </Typography>
                                <Switch checked={turnOffComments} onChange={handleTurnOffCommentsChange} sx={{ color: 'white' }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: textColorSecondary, fontSize: '12px', fontWeight: 600 }}>
                                {locales[lang]?.captionTurnOffComment}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );

    return (
        <>
            {!isLoading && !isSuccess && renderAction()}
            {isLoading && !isSuccess && (
                <Box sx={boxMain} >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '40px' }}><CircularProgress sx={{ fontSize: 50 }} /></Typography>
                    </Box>
                </Box>
            )}
            {isSuccess && !isLoading && (
                <Box sx={boxMain}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '40px' }}><CheckCircleOutlineIcon sx={{ fontSize: 120, color: 'green' }} /></Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>{locales[lang]?.postSuccessfully}</Typography>
                    </Box>
                </Box>
            )}
        </>
    );
}