'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";
import Link from 'next/link';
import { api } from '@/utils/api';
import { stringify } from 'querystring';

type Props = {
    myUser: any;
    userBlock: any;
    handleClose: () => void;
}

const buttonStyles = ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    cursor: 'pointer'
})
function FeedbackDialog({
    myUser,
    userBlock,
    handleClose
}: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleBlockUser = async () => {
        try {
            setIsLoading(true);
            const dataBlock = {
                idUser: myUser?.id,
                idUserBlock: userBlock?._id
            }
            const { data, error } = await api<any>('/block', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataBlock)
            });
            if (error) {
                console.error(error);
                setIsLoading(false);
                return;
            }
            if (data) {
                setIsLoading(false);
                handleClose();
                return
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUnfollowUser = async () => {
        try {
            setIsLoading(true);
            const dataBlock = {
                id: myUser?.id,
                idFollow: userBlock?._id
            }
            const { data, error } = await api<any>('/follows/unfollow', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataBlock)
            });
            if (error) {
                console.error(error);
                setIsLoading(false);
                return;
            }
            if (data) {
                setIsLoading(false);
                handleClose();
                return
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ height: 474, width: 400 }}>
            <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                    <FaRegCheckCircle style={{ fontSize: 48, color: '#58c41b' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Thanks for your feedback</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography component="span" sx={{ fontSize: 15, fontWeight: 400, textAlign: 'center' }}>
                        <Typography component="span" sx={{ fontSize: 15, fontWeight: 400 }}>
                            When you see something you don&apos;t like on Instagram, you can report it if it doesn&apos;t follow our
                        </Typography>
                        <Link href="#" style={{ color: 'blue', textDecoration: 'none' }}>Community Guidelines</Link>
                        <Typography component="span" sx={{ fontSize: 15, fontWeight: 400 }}>, or you can remove the person who shared it from your experience.</Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ height: 40 }} />

            <Box>
                <Box sx={{ height: 154 }}>
                    <Box sx={{ height: 50 }}>
                        <Box sx={buttonStyles} onClick={handleBlockUser}>
                            <Typography sx={{ padding: '16px', fontSize: 14, fontWeight: 400 }}>
                                Block {userBlock?.fullName}
                            </Typography>
                            <FaAngleRight style={{ fontSize: 20 }} />
                        </Box>
                    </Box>

                    <Box sx={{ height: 50 }}>
                        <Box sx={buttonStyles} onClick={handleUnfollowUser}>
                            <Typography sx={{ padding: '16px', fontSize: 14, fontWeight: 400 }}>
                                Unfollow {userBlock?.fullName}
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                                <FaAngleRight style={{ fontSize: 20, fontWeight: 400 }} />
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ height: 50 }}>
                        <Box sx={buttonStyles}>
                            <Typography sx={{ padding: '16px', fontSize: 14, fontWeight: 400 }}>
                                <Link href="#" style={{ color: 'black', textDecoration: 'none' }}>
                                    Learn more about Instagram&apos;s Community Guidelines
                                </Link>
                            </Typography>
                            <FaAngleRight style={{ fontSize: 20 }} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ height: 60 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
                            <Button onClick={handleClose}
                                variant="contained"
                                sx={{ color: 'blue', textTransform: 'none', width: '100%', height: 45 }}
                            >
                                OK
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default FeedbackDialog;