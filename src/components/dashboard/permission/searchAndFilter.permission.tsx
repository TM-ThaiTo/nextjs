'use client';

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styleButtonReset, styleSelect, boxActionTable } from '@/style/style_mui/table';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import queryString from "query-string";
type Props = {
    methods: string[];
    modules: string[];
}

export default function SearchAndFilterPermission({ methods, modules }: Props) {
    const router = useRouter();
    const [isInputSearch, setIsInputSearch] = useState<string>('');
    const [isSelectedMethod, setIsSelectedMethod] = useState<string>('');
    const [isSelectedModule, setIsSelectedModule] = useState<string>('');

    const handleSelectModule = (event: SelectChangeEvent) => setIsSelectedModule(event.target.value as string);
    const handleChangeMethod = (event: SelectChangeEvent) => setIsSelectedMethod(event.target.value as string);
    const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => setIsInputSearch(e.target.value);

    const handleReset = () => {
        setIsInputSearch('');
        setIsSelectedMethod('');
        setIsSelectedModule('');
        router.push('/dashboard/permission');
    }

    const handleSearch = () => {
        const query = queryString.stringify({
            search: (isInputSearch || '').trim(),
            method: isSelectedMethod || '',
            module: isSelectedModule || '',
            page: '1',
            per_page: '5',
        }).toString();
        router.push(`/dashboard/permission?${query}`);
    }

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                <TextField
                    id="outlined-basic"
                    label="Search width pesmissionName or description"
                    variant="outlined"
                    value={isInputSearch}
                    onChange={handleChangeInputSearch}
                    sx={{
                        marginRight: 2,
                        width: '100%',
                        maxWidth: 500,
                        minWidth: 100,
                    }}
                />
                <FormControl sx={{ width: '100%', maxWidth: 150, minWidth: 100, marginRight: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Method
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSelectedMethod}
                        label="Method"
                        onChange={handleChangeMethod}
                        MenuProps={{ PaperProps: { style: { maxHeight: 300, overflowY: 'auto' } } }}
                        sx={styleSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        {methods.map((method) => (
                            <MenuItem key={method} value={method}>{method}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: 300, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Module
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSelectedModule}
                        label="Method"
                        onChange={handleSelectModule}
                        MenuProps={{ PaperProps: { style: { maxHeight: 300, overflowY: 'auto' } } }}
                        sx={styleSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        {modules.map((method) => (
                            <MenuItem key={method} value={method}>{method}</MenuItem>
                        ))}
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