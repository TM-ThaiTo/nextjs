'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styleButtonReset, styleSelect, boxActionTable } from '@/style/style_mui/table';
import queryString from "query-string";

export default function SearchPostDashboard() {
    const router = useRouter();
    const [isInputSearch, setIsInputSearch] = useState<string>('');
    const [isIdUser, setIsIdUser] = useState<string>('');
    const [isSlugPost, setIsSlugPost] = useState<string>('');
    const [isSelectedHideLike, setIsSelectedHideLike] = useState<string>('');

    const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => setIsInputSearch(e.target.value);
    const handleChangeInputIdUser = (e: React.ChangeEvent<HTMLInputElement>) => setIsIdUser(e.target.value);
    const handleChangeInputSlugPost = (e: React.ChangeEvent<HTMLInputElement>) => setIsSlugPost(e.target.value);
    const handleSelectedHideLike = (event: SelectChangeEvent) => setIsSelectedHideLike(event.target.value as string);

    const handleReset = () => {
        setIsInputSearch('');
        setIsIdUser('');
        setIsSlugPost('');
        router.push('/dashboard/post');
    }

    const handleSearch = () => {
        const searchParams = queryString.stringify({
            search: (isInputSearch || '').trim(),
            idUser: (isIdUser || '').trim(),
            slug: (isSlugPost || '').trim(),
            page: '1',
            per_page: '5',
        }).toString();
        router.push(`/dashboard/post?${searchParams}`);
    }

    const FieldInput = [
        { label: 'Input search', value: isInputSearch, onChange: handleChangeInputSearch },
        { label: 'Input id user', value: isIdUser, onChange: handleChangeInputIdUser },
        { label: 'Input slug post', value: isSlugPost, onChange: handleChangeInputSlugPost },
    ]

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                {FieldInput.map(({ label, value, onChange }, index) => (
                    <TextField
                        key={index}
                        id="outlined-basic" variant="outlined"
                        label={label} value={value} onChange={onChange}
                        sx={{ marginRight: 2, width: '100%', maxWidth: 150, minWidth: 100, }}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" sx={styleButtonReset} onClick={handleReset} >
                    Reset
                </Button>
                <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleSearch} >
                    Search
                </Button>
            </Box>
        </Box>
    )
}