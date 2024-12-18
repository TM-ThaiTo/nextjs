'use client';

import TablePagination from "@mui/material/TablePagination";
import { useRouter } from 'next/navigation'

type Props = {
    total: number;
    page: number;
    limit: number;
    type: number; // 1: no search, 2: search
    url?: string;
}

export default function PaginationRole({ total, page, limit, type, url }: Props) {
    const router = useRouter();

    const handleChangePage = (event: unknown, newPage: number) => {
        if (newPage < 1) return;
        if (type === 1) router.push(`/dashboard/role/?page=${newPage}&per_page=${limit}`);
        if (type === 2) router.push(`/dashboard/role/?${url}&page=${newPage}&per_page=${limit}`);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = +event.target.value;
        router.push(`/dashboard/role/?page=1&per_page=${newLimit}`);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5, 25, 100]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}