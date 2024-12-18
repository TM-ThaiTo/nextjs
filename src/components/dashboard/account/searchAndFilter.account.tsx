'use client'

import { ChangeEvent, useState } from 'react';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styleButtonReset, styleSelect, boxActionTable } from '@/style/style_mui/table';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { cleanInput } from "@/helper/clear_input";

const accountTypes = ['LOCAL', 'GOOGLE', 'GITHUB',]
const accountRoles = ['SUPER_ADMIN', 'NORMAL_USER']

export default function SearchAndFilterAccountDashboard() {
    const router = useRouter();

    const [isInputSearch, setIsInputSearch] = useState<string>('');
    const [isSelectedTypeAccount, setIsSelectedTypeAccount] = useState<string>('');
    const [isSelectedRoleAccount, setIsSelectedRoleAccount] = useState<string>('');

    const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => setIsInputSearch(e.target.value);
    const handleChangeSelectedTypeAccount = (event: SelectChangeEvent) => setIsSelectedTypeAccount(event.target.value);
    const handleChangeSelectedRoleAccount = (event: SelectChangeEvent) => setIsSelectedRoleAccount(event.target.value);

    const handleReset = () => {
        setIsInputSearch('');
        setIsSelectedTypeAccount('');
        setIsSelectedRoleAccount('');
        router.push('/dashboard/account');
    }
    const handleSearch = () => {
        const searchParams = new URLSearchParams({
            search: cleanInput(isInputSearch) || '',
            type: cleanInput(isSelectedTypeAccount) || '',
            roleName: cleanInput(isSelectedRoleAccount) || '',
            page: '1',
            per_page: '5',
        }).toString();
        router.push(`/dashboard/account?${searchParams}`);
    }

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                <TextField
                    id="outlined-basic"
                    label="Search with email, username"
                    variant="outlined"
                    value={isInputSearch}
                    onChange={handleChangeInputSearch}
                    sx={{ marginRight: 2, width: '100%', maxWidth: 300, minWidth: 100, }}
                />
                <FormControl sx={{ width: '100%', maxWidth: 140, minWidth: 100, marginRight: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSelectedTypeAccount}
                        label="Type"
                        onChange={handleChangeSelectedTypeAccount}
                        MenuProps={{ PaperProps: { style: { maxHeight: 300, overflowY: 'auto' } } }}
                        sx={styleSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        {accountTypes.map((item) => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: 170, minWidth: 100, marginRight: 2 }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Role
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSelectedRoleAccount}
                        label="Method"
                        onChange={handleChangeSelectedRoleAccount}
                        MenuProps={{ PaperProps: { style: { maxHeight: 300, overflowY: 'auto' } } }}
                        sx={styleSelect}
                    >
                        <MenuItem value="">None</MenuItem>
                        {accountRoles.map((item) => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
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