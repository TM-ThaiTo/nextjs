'use client';

import React, { useCallback, useEffect, useState } from "react";
import { Box, Icon, Typography, IconButton, Divider, CircularProgress } from "@mui/material";
import { api } from "@/utils/api";
import { IReports, ResponseReports } from "@/types/report";
import { Close, Feed } from "@mui/icons-material";
import NoDataIcon from "@mui/icons-material/Warning";
import FeedbackDialog from "@/components/report/feedback";

type Props = {
    myUser: any;
    type: number;
    userBlock?: any;
    post?: any;
    comment?: any;
    account?: any;
    message?: any;
    handleClose: () => void;
}

const ReportLoadingAndNoData = {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: 'gray',
};

const itemReport = {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '0.5px solid gray',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
};

export default function ReportModal({
    myUser,
    type,
    userBlock,
    post,
    comment,
    account,
    message,
    handleClose
}: Props) {
    const [dataReport, setDataReport] = useState<IReports>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFeedback, setIsFeedback] = useState<boolean>(false);

    const handleGetReport = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api<ResponseReports>(`/content-reports/type/${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.error) {
                console.error(response.error);
                return;
            }

            if (response.data) {
                const res = response.data?.data;
                setDataReport(res);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        setIsFeedback(false);
        handleGetReport();
    }, [type, handleGetReport]);

    const handleReport = async (item: any) => {
        try {
            var idReport = null;
            if (type === 1 && post) idReport = post._id;
            if (type === 2 && comment) idReport = comment._id;
            if (type === 3 && account) idReport = account._id;
            if (type === 4 && message) idReport = message._id;

            const dataReport = {
                idReporter: myUser?.id,
                type: type,
                idReport: idReport,
                idContent: item._id,
                other: '',
            }

            const { data, error } = await api(`/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataReport)
            });

            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                setIsFeedback(true);
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            {isFeedback && <FeedbackDialog myUser={myUser} userBlock={userBlock} handleClose={handleClose} />}
            {!isFeedback && (
                <>
                    <Box sx={{ height: 50, display: 'flex' }}>
                        <Box sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        </Box>
                        <Box sx={{ width: 'calc(100% - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 800 }}>Report</Typography>
                        </Box>
                        <Box sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <IconButton sx={{ color: 'red' }}>
                                <Close />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        {loading ? (
                            <Box sx={ReportLoadingAndNoData}>
                                <CircularProgress />
                            </Box>
                        ) : dataReport?.length > 0 ? (
                            dataReport.map((item: any, index: number) => {
                                const isLastItem = index === dataReport.length - 1;
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            ...itemReport,
                                            borderBottom: isLastItem ? 'none' : '0.5px solid gray'
                                        }}
                                        onClick={() => handleReport(item)}
                                    >
                                        <Typography>{item?.contentVN}</Typography>
                                    </Box>
                                );
                            })
                        ) : (
                            <Box sx={ReportLoadingAndNoData}>
                                <NoDataIcon sx={{ marginRight: 1 }} />
                                <Typography>Không có báo cáo nào</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}
