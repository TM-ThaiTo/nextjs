'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styleButtonReset, boxActionTable } from '@/style/style_mui/table';
import queryString from "query-string";

type Props = {
    id: string;
}
export default function SearchCommentDashboard({ id }: Props) {
    const router = useRouter();
    const [isInputSearch, setIsInputSearch] = useState<string>('');

    const [isIdComment, setIsIdComment] = useState<string>('');
    const [isIdUser, setIsIdUser] = useState<string>('');
    const [isIdPost, setIsSlugPost] = useState<string>('');

    const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => setIsInputSearch(e.target.value);
    const handleChangeInputIdUser = (e: React.ChangeEvent<HTMLInputElement>) => setIsIdUser(e.target.value);
    const handleChangeInputIdPost = (e: React.ChangeEvent<HTMLInputElement>) => setIsSlugPost(e.target.value);
    const handleChangeInputIdComment = (e: React.ChangeEvent<HTMLInputElement>) => setIsIdComment(e.target.value);

    const handleReset = () => {
        setIsInputSearch('');
        setIsIdUser('');
        setIsSlugPost('');
        setIsIdComment('');
        router.push(`/dashboard/post/comment/${id}`);
    }

    const handleSearch = () => {
        const searchParams = queryString.stringify({
            search: (isInputSearch || '').trim(),
            idUser: (isIdUser || '').trim(),
            idPost: (isIdPost || '').trim(),
            idComment: (isIdComment || '').trim(),
            page: '1',
            per_page: '5',
        }).toString();
        router.push(`/dashboard/post/comment/${id}?${searchParams}`);
    }

    const FieldInput = [
        { label: 'Input search', value: isInputSearch, onChange: handleChangeInputSearch },
        { label: 'Input id comment', value: isIdComment, onChange: handleChangeInputIdComment },
        { label: 'Input id user', value: isIdUser, onChange: handleChangeInputIdUser },
        { label: 'Input slug post', value: isIdPost, onChange: handleChangeInputIdPost },
    ]

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                {FieldInput.map(({ label, value, onChange }, index) => (
                    <TextField
                        key={index}
                        id="outlined-basic" variant="outlined"
                        label={label} value={value} onChange={onChange}
                        sx={{ marginRight: 2, width: '100%', maxWidth: 200, minWidth: 100, }}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" sx={styleButtonReset} onClick={handleReset} > Reset </Button>
                <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleSearch} > Search </Button>
            </Box>
        </Box>
    )
}