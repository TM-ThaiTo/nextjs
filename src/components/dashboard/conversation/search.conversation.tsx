'use client';

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import { styleButtonReset, boxActionTable } from '@/style/style_mui/table';
import queryString from "query-string";

type FormValues = { id: string; slug: string; creator: string; recipient: string; };
const inputFields: { name: keyof FormValues; label: string }[] = [
    { name: 'id', label: 'Input Id' },
    { name: 'slug', label: 'Input Slug' },
    { name: 'creator', label: 'Input Creator' },
    { name: 'recipient', label: 'Input Recipient' }
];

export default function SearchConversationDashboard() {
    const router = useRouter();
    const { control, handleSubmit, reset } = useForm<FormValues>({ defaultValues: { id: '', slug: '', creator: '', recipient: '' } });

    const onSubmit = (data: FormValues) => {
        const searchParams = queryString.stringify({
            id: data.id.trim(),
            slug: data.slug.trim(),
            creator: data.creator.trim(),
            recipient: data.recipient.trim(),
            page: '1',
            per_page: '5',
        });
        router.push(`/dashboard/conversation?${searchParams}`);
    };

    const handleReset = () => {
        reset();
        router.push('/dashboard/conversation');
    };

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                {inputFields.map((item, index) => (
                    <Controller
                        key={index}
                        name={item.name}
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label={item.label} variant="outlined"
                                sx={{ marginRight: 2, width: '100%', maxWidth: 200, minWidth: 100 }}
                            />
                        )}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" sx={styleButtonReset} onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleSubmit(onSubmit)}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}
