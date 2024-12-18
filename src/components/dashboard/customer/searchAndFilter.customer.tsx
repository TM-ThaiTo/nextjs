'use client'

import { useForm, Controller } from 'react-hook-form';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styleButtonReset, boxActionTable } from '@/style/style_mui/table';
import { useRouter } from '@/utils/hooks/router/useRouter';
import queryString from "query-string";

interface FormData {
    search: string;
    follower: number | '';
    following: number | '';
    post: number | '';
    report: number | '';
}

export default function SearchAndFilterCustomerDashboard() {
    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormData>({ defaultValues: { search: '', follower: '', following: '', post: '', report: '' } });
    const router = useRouter();

    const handleSearch = (data: FormData) => {
        const query = queryString.stringify({
            search: (data.search || '').trim(),
            follower: data.follower ? data.follower.toString() : '',
            following: data.following ? data.following.toString() : '',
            post: data.post ? data.post.toString() : '',
            report: data.report ? data.report.toString() : '',
            page: '1',
            per_page: '5',
        });
        router.push(`/dashboard/customer?${query}`);
    };

    const handleReset = () => {
        reset();
        router.push('/dashboard/customer');
    };

    return (
        <Box sx={boxActionTable}>
            <Box sx={{ display: 'flex', width: '80%' }}>
                <Controller
                    name="search"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Search"
                            variant="outlined"
                            sx={{ marginRight: 2, width: '100%', maxWidth: 300, minWidth: 100 }}
                        />
                    )}
                />
                <Controller
                    name="follower"
                    control={control}
                    rules={{
                        min: { value: 0, message: "Follower must be 0 or more" }
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Follower"
                            variant="outlined"
                            error={!!errors.follower}
                            helperText={errors.follower ? errors.follower.message : ''}
                            sx={{ marginRight: 2, width: '100%', maxWidth: 100, minWidth: 100 }}
                            onChange={(e) => {
                                const value = e.target.value === '' ? '' : Math.max(0, Number(e.target.value)); // Allow empty input
                                onChange(value);
                            }}
                        />
                    )}
                />
                <Controller
                    name="following"
                    control={control}
                    rules={{
                        min: { value: 0, message: "Following must be 0 or more" }
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Following"
                            variant="outlined"
                            error={!!errors.following}
                            helperText={errors.following ? errors.following.message : ''}
                            sx={{ marginRight: 2, width: '100%', maxWidth: 110, minWidth: 100 }}
                            onChange={(e) => {
                                const value = e.target.value === '' ? '' : Math.max(0, Number(e.target.value)); // Allow empty input
                                onChange(value);
                            }}
                        />
                    )}
                />
                <Controller
                    name="post"
                    control={control}
                    rules={{
                        min: { value: 0, message: "Post must be 0 or more" }
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Post"
                            variant="outlined"
                            error={!!errors.post}
                            helperText={errors.post ? errors.post.message : ''}
                            sx={{ marginRight: 2, width: '100%', maxWidth: 100, minWidth: 100 }}
                            onChange={(e) => {
                                const value = e.target.value === '' ? '' : Math.max(0, Number(e.target.value)); // Allow empty input
                                onChange(value);
                            }}
                        />
                    )}
                />
                <Controller
                    name="report"
                    control={control}
                    rules={{
                        min: { value: 0, message: "Report must be 0 or more" }
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            type="number"
                            label="Report"
                            variant="outlined"
                            error={!!errors.report}
                            helperText={errors.report ? errors.report.message : ''}
                            sx={{ marginRight: 2, width: '100%', maxWidth: 100, minWidth: 100 }}
                            onChange={(e) => {
                                const value = e.target.value === '' ? '' : Math.max(0, Number(e.target.value)); // Allow empty input
                                onChange(value);
                            }}
                        />
                    )}
                />
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Button variant="outlined" sx={styleButtonReset} onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleSubmit(handleSearch)}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}
