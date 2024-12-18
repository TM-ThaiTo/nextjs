import { useCallback, useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slider from "react-slick";
import { IconButton, List, ListItem, ListItemAvatar, Avatar } from '@mui/material';
import { FaRegFolder, FaPlus } from "react-icons/fa";
import { settings } from '@/helper/settingSlider';
import { MediaFile, fMediaFile, fMediaFiles } from "@/types/post";
import {
    flexCenterCenter, styleIconCreatePost, commonStyles, actionButtonStyle, titleStyle, cropPopupFileMedia,
    cropPopupFileMedia_buttonDelete,
} from '@/style/style_mui/app.modalStyle';
import CloseIcon from '@mui/icons-material/Close';
import "react-image-crop/dist/ReactCrop.css";
import CropOneImage from "@/components/modal/create-post/crop/crop.image";
import EditPost from "@/components/modal/create-post/edit/modal.edit";
import CropOneVideo from "./crop.video";
import { getLanguage } from "@/helper/mapTypesLanguage";
import { locales } from "@/language/constant";
import useThemeColors from "@/utils/hooks/theme/hookTheme";

type Props = {
    myUser: any;
    mediaFiles: MediaFile[];
    handleBackCreateMedia: () => void;
}

export default function ModalCropMedia({
    myUser,
    mediaFiles,
    handleBackCreateMedia,
}: Props) {
    const lang = getLanguage();
    const { textColorPrimary, borderColor, linkColor, textColorSecondary } = useThemeColors();

    const [mediaFilesCrops, setMediaFilesCrops] = useState<MediaFile[]>(mediaFiles);
    const [mediaFileDoneCrops, setMediaFileDoneCrops] = useState<fMediaFiles>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const sliderRef = useRef<Slider>(null);
    const [showSlider, setShowSlider] = useState<boolean>(false);
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const popupContainerRef = useRef<HTMLDivElement>(null);
    const [isCropMedia, setIsCropMedia] = useState<boolean>(true);
    const [isEditMedia, setIsEditMedia] = useState<boolean>(false);

    const handleAddMedia = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const mediaFilesPromises = Array.from(files).map((file) => {
                const fileUrl = URL.createObjectURL(file);
                const fileType: 'video' | 'image' = file.type.startsWith('video') ? 'video' : 'image';
                const fileSize = file.size;

                return fileType !== 'video' ? Promise.resolve<MediaFile>({
                    file: {
                        url: fileUrl,
                        base64: '',
                        size: fileSize,
                    },
                    type: 'image',
                }) : undefined;
            });

            const validMediaFiles = (await Promise.all(mediaFilesPromises)).filter(Boolean) as MediaFile[];

            if (validMediaFiles.length) {
                setMediaFilesCrops(prevMediaFiles => [...prevMediaFiles, ...validMediaFiles]);
            }
        }
    };

    const handleRemoveMedia = (index: number) => setMediaFilesCrops(prevFiles => prevFiles.filter((_, i) => i !== index));
    const handleGetPopup = () => setPopupOpen(!popupOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sliderContainerRef.current && !sliderContainerRef.current.contains(event.target as Node)) { setShowSlider(false); }
        };
        if (showSlider) document.addEventListener('mousedown', handleClickOutside);
        else document.removeEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSlider]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupContainerRef.current && !popupContainerRef.current.contains(event.target as Node)) { setPopupOpen(false); }
        };
        if (popupOpen) document.addEventListener('mousedown', handleClickOutside);
        else document.removeEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupOpen]);

    const handleBeforeChange = (oldIndex: number, newIndex: number) => {
        if (newIndex > oldIndex) setCurrentIndex(newIndex);
        else return false;
    };

    const handleItemClick = (index: number) => {
        setCurrentIndex(index);
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    const renderItemMedia = useCallback(() => {
        if (!mediaFilesCrops || mediaFilesCrops.length === 0) return null;
        return (
            <Slider
                ref={sliderRef}
                {...{ ...settings(sliderRef, currentIndex, mediaFilesCrops.length), speed: 0 }}
                beforeChange={handleBeforeChange}
                afterChange={setCurrentIndex}
            >
                {mediaFilesCrops.map((item, index) => {
                    const url = item?.file?.url;
                    const type = item?.type;
                    const key = url ? url : `media-${index}`;
                    return (
                        <Box key={key} sx={{ height: 810, width: 810, position: 'relative' }}>
                            <Box sx={{
                                position: 'absolute', bottom: 0, top: 0, width: '100%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                background: 'none', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px',
                            }}>
                                {type === 'image'
                                    ? <CropOneImage
                                        url={url}
                                        mediaFilesCrops={mediaFilesCrops}
                                        setMediaFileDoneCrops={setMediaFileDoneCrops}
                                    />
                                    : <CropOneVideo
                                        url={url}
                                        mediaFilesCrops={item}
                                        setMediaFileDoneCrops={setMediaFileDoneCrops}
                                    />
                                }
                            </Box>
                        </Box>
                    )
                })}
            </Slider>
        );
    }, [mediaFilesCrops, currentIndex]);


    const handleProp = () => {
        return (
            <>
                {popupOpen && (
                    <Box ref={popupContainerRef} sx={cropPopupFileMedia} >
                        <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                            {mediaFilesCrops.map((item, index) => (
                                <ListItem key={item?.file?.url} sx={{ width: 'auto', padding: 0, marginRight: '10px', position: 'relative', }} >
                                    <ListItemAvatar
                                        sx={{
                                            position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s ease',
                                            boxShadow: currentIndex !== index ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
                                        }}
                                    >
                                        {item.type === 'image' && (
                                            <ButtonBase onClick={() => handleItemClick(index)}>
                                                <Avatar src={item.file.url} alt="Selected Image" sx={{ width: 94, height: 94, borderRadius: 0 }} />
                                            </ButtonBase>
                                        )}

                                        {item.type === 'video' && 'thumbnails' in item.file && item.file.thumbnails.length > 0 && (
                                            <ButtonBase onClick={() => handleItemClick(index)}>
                                                <Avatar src={item?.file?.thumbnails[0]} alt="Selected Image" sx={{ width: 94, height: 94, borderRadius: 0 }} />
                                            </ButtonBase>
                                        )}

                                        {currentIndex !== index && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0, left: 0, width: '100%', height: '100%',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    zIndex: 1, pointerEvents: 'none',
                                                }}
                                            />
                                        )}
                                    </ListItemAvatar>
                                    <IconButton sx={cropPopupFileMedia_buttonDelete} onClick={() => handleRemoveMedia(index)}>
                                        <CloseIcon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </ListItem>
                            ))}
                            <ListItem sx={{ width: 'auto', padding: 0 }}>
                                <label htmlFor="file-upload-modal">
                                    <input type="file" accept="image/*,video/*" id="file-upload-modal" multiple
                                        style={{ display: 'none' }}
                                        onChange={handleAddMedia}
                                    />
                                    <IconButton component="span" sx={{ width: 80, height: 80, backgroundColor: 'gray', borderRadius: 3 }}>
                                        <FaPlus style={{ fontSize: 30, color: 'white' }} />
                                    </IconButton>
                                </label>
                            </ListItem>
                        </List>
                    </Box>
                )}
            </>
        )
    }

    const handleChangeEditMedia = async () => {
        if (mediaFileDoneCrops.length === 0) {
            mediaFilesCrops.map((item) => {
                const dataImage: fMediaFile = {
                    file: {
                        url: item.file.url,
                        base64: '',
                    },
                    type: item.type,
                }
                setMediaFileDoneCrops((prev) => {
                    return [...prev, dataImage];
                })
            })
        }

        setIsEditMedia(true);
        setIsCropMedia(false);
    };

    const handleBackComponentCreate = () => {
        setMediaFilesCrops([]);
        handleBackCreateMedia();
    }

    const handleBackCropMedia = () => {
        setIsCropMedia(true);
        setIsEditMedia(false);
    }

    return (
        <>
            {isCropMedia && (
                <>
                    <Box sx={{ height: 42, borderBottom: "1px solid gray" }}>
                        <Box sx={commonStyles}>
                            <ButtonBase onClick={handleBackComponentCreate} sx={{ color: textColorPrimary }}>
                                <ArrowBackIcon />
                            </ButtonBase>
                            <Typography sx={{ ...titleStyle, color: textColorPrimary }}>{locales[lang]?.crop}</Typography>
                            <ButtonBase onClick={handleChangeEditMedia}>
                                <Typography sx={{ ...actionButtonStyle, color: linkColor }}>{locales[lang]?.next}</Typography>
                            </ButtonBase>
                        </Box>
                    </Box>

                    <Box sx={{ height: 810, width: 810, position: 'relative', background: 'none' }}>
                        {mediaFilesCrops.length !== 0 && mediaFilesCrops.length > 0 && renderItemMedia()}

                        <Box sx={{ position: 'absolute', zIndex: 2, bottom: 0, right: 0, height: 80, width: '50%', background: 'none' }}>
                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
                                <Box sx={flexCenterCenter}>
                                    <IconButton component="span" sx={{ ...flexCenterCenter, ...styleIconCreatePost, backgroundColor: '#434346' }} onClick={handleGetPopup}>
                                        <FaRegFolder style={{ fontSize: 18, color: 'white' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        {handleProp()}
                    </Box>
                </>
            )}
            {isEditMedia &&
                <EditPost
                    myUser={myUser}
                    mediaFiles={mediaFiles}
                    finalMediaFiles={mediaFileDoneCrops}
                    handleBackCropMedia={handleBackCropMedia}
                />
            }
        </>
    );
}