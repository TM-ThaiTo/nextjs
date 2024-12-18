'use client';

import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import { getLanguage } from "@/helper/mapTypesLanguage";
import { locales } from '@/language/constant';
import { findUser } from '@/actions/customer/actions';
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { useRouter } from '@/utils/hooks/router/useRouter';

export default function FormSearchPage() {
    const { textColorPrimary, borderColor, actionHoverColor, linkColor } = useThemeColors();
    const lang = getLanguage();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [search, setSearch] = useState<string>('');
    const [historySearch, setHistorySearch] = useState<any>([]);

    useEffect(() => {
        const dataSearch = localStorage.getItem('search');
        if (dataSearch) {
            setHistorySearch(JSON.parse(dataSearch));
        } else {
            setHistorySearch([]);
        }
    }, []);
    const searchUsers = async (query: string) => {
        setLoading(true);
        try {
            const { data, error } = await findUser(query);
            if (data) setUsers(data?.data);
            if (error) setUsers([]);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(() => {
            if (value.trim().length > 0) {
                searchUsers(value);
            } else {
                setUsers([]);
            }
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    const handleClickUser = (user: any) => {
        const userName = user?.userName;
        if (userName?.trim()) {
            const data = [user];
            localStorage.setItem('search', JSON.stringify(data));
            router.push(`/${userName}`);
        }
    };

    const handleBack = () => router.back();

    const handleDeleteAll = () => {
        localStorage.removeItem('search');
        setHistorySearch([]);
    }

    return (
        <>
            <Box sx={{ width: '100%', maxWidth: 700, height: '100vh', border: `1px solid ${borderColor}` }}>
                <Box sx={{ width: '100%', height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}` }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            color: textColorPrimary,
                            '&:hover': { backgroundColor: actionHoverColor }
                        }}
                    >
                        <ArrowBackIosIcon sx={{ fontSize: 30, pl: '5px' }} />
                    </IconButton>
                    <Typography sx={{ fontSize: 20, color: textColorPrimary, fontWeight: 700 }}>
                        {locales[lang]?.searchPage?.title}
                    </Typography>
                    <div />
                </Box>

                <Box display="flex" alignItems="center" px={2} py={1} sx={{ height: 60, borderBottom: `1px solid ${borderColor}` }}>
                    <Typography variant="body1" fontWeight="bold" mr={1} display="flex" alignItems="center" pr="10px">
                        <SearchIcon />
                    </Typography>
                    <Box display="flex" alignItems="center" flexGrow={1}>
                        <InputBase
                            placeholder={locales[lang]?.searchPage?.search}
                            fullWidth
                            sx={{ color: textColorPrimary, bgcolor: borderColor, px: 1, borderRadius: 3, height: 40 }}
                            value={search}
                            onChange={handleSearchChange}
                        />
                        {search && (
                            <IconButton
                                onClick={() => setSearch('')}
                                sx={{ ml: 1, color: textColorPrimary, p: 0 }}
                            >
                                <ClearIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                {search ? (
                    <Box sx={{ height: '100%', maxHeight: 400, overflowY: 'auto', mt: 1 }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <CircularProgress size={24} sx={{ color: 'gray' }} />
                            </Box>
                        ) : users.length > 0 ? (
                            users.map(user => (
                                <Box key={user.id} display="flex" alignItems="center" bgcolor="none" p={1} height={66}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: actionHoverColor }
                                    }}
                                    onClick={() => handleClickUser(user)}
                                >
                                    <Avatar src={user.avatar || undefined} alt={user.fullName} sx={{ width: 40, height: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">{user.fullName}</Typography>
                                        <Typography variant="body2" color="gray">@{user.userName}</Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : <></>}
                    </Box>
                ) : historySearch.length > 0 ? (
                    <Box sx={{ height: '100%', maxHeight: 400, overflowY: 'auto', mt: 1 }}>
                        {historySearch.map((user: any) => (
                            <>
                                <Box sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '30px', pr: '30px' }}>
                                    <Typography sx={{ color: textColorPrimary, fontWeight: 700 }}>{locales[lang]?.searchPage?.recent}</Typography>
                                    <Typography
                                        onClick={handleDeleteAll}
                                        sx={{
                                            color: linkColor, fontWeight: 700, cursor: 'pointer',
                                            '&:hover': { color: textColorPrimary }
                                        }}>{locales[lang]?.searchPage?.deleteAll}</Typography>
                                </Box>
                                <Box key={user.id} display="flex" alignItems="center" bgcolor="none" p={1} height={66}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: actionHoverColor }
                                    }}
                                    onClick={() => handleClickUser(user)}
                                >
                                    <Avatar src={user.avatar || undefined} alt={user.fullName} sx={{ width: 40, height: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">{user.fullName}</Typography>
                                        <Typography variant="body2" color="gray">@{user.userName}</Typography>
                                    </Box>
                                </Box>
                            </>
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography>{locales[lang]?.searchPage?.noHistory}</Typography>
                    </Box>
                )}
            </Box>
        </>
    );
}
