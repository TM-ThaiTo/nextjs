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

type Props = {
    roleNames: string[];
}

export default function SearchAndFilterRole({ roleNames }: Props) {
    const router = useRouter();
    const [isInputSearch, setIsInputSearch] = useState<string>('');
    const [isSelectedRoleName, setIsSelectedRoleName] = useState<string>('');
    const [isSelectedActive, setIsSelectedActive] = useState<string>('');

    const handleChangeRoleName = (event: SelectChangeEvent) => setIsSelectedRoleName(event.target.value as string);
    const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => setIsInputSearch(e.target.value);
    const handleChangeActive = (event: SelectChangeEvent) => setIsSelectedActive(event.target.value as string);

    const handleReset = () => {
        setIsInputSearch('');
        setIsSelectedRoleName('');
        setIsSelectedActive('');
        router.push('/dashboard/role');
    }

    const handleSearch = () => {
        const searchParams = queryString.stringify({
            search: (isInputSearch || '').trim(),
            roleName: isSelectedRoleName || '',
            active: isSelectedActive || '',
            page: '1',
            per_page: '5',
        }).toString();
        router.push(`/dashboard/role?${searchParams}`);
    }

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                <TextField
                    id="outlined-basic"
                    label="Search with description"
                    variant="outlined"
                    value={isInputSearch}
                    onChange={handleChangeInputSearch}
                    sx={{
                        marginRight: 2,
                        width: '100%',
                        maxWidth: 300,
                        minWidth: 100,
                    }}
                />
                <FormControl sx={{ width: '100%', maxWidth: 200, minWidth: 100, marginRight: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Role Name
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSelectedRoleName}
                        label="Method"
                        onChange={handleChangeRoleName}
                        MenuProps={{ PaperProps: { style: { maxHeight: 300, overflowY: 'auto' } } }}
                        sx={styleSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        {roleNames.map((method) => (
                            <MenuItem key={method} value={method}>{method}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: 100, minWidth: 100, marginRight: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Active
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSelectedActive}
                        label="Method"
                        onChange={handleChangeActive}
                        MenuProps={{ PaperProps: { style: { maxHeight: 300, overflowY: 'auto' } } }}
                        sx={styleSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="TRUE">TRUE</MenuItem>
                        <MenuItem value="FALSE">FALSE</MenuItem>
                    </Select>
                </FormControl>
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