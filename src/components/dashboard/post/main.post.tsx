'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { tablePost } from '@/constants/row_table';
import { filterPosts } from '@/utils/filter/post';
import { useRouter } from '@/utils/hooks/router/useRouter';
import NoData from '@/components/no-data/no-data';
import ActionTablePostDashboard from './action.table.post';

type Props = {
    posts: any[];
    _query: any;
};

export default function TablePostDashboard({ posts, _query }: Props) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentRowId, setCurrentRowId] = useState<{ id: string, slug: string, idUser: string }>();

    const columns: GridColDef[] = [
        ...tablePost,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 70,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); setCurrentRowId({ id: params.row.id, slug: params.row.slug, idUser: params.row.idUser }); };
                const handleClose = () => { setAnchorEl(null); setCurrentRowId({ id: '', slug: '', idUser: '' }); };
                const open = Boolean(anchorEl);
                const id = open ? 'simple-popover' : undefined;
                return (
                    <ActionTablePostDashboard
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        currentRowId={currentRowId}
                        handleClick={handleClick}
                        handleClose={handleClose}
                    />
                );
            },
        },
    ];

    const newData = filterPosts(posts);
    const paginationModel = { page: _query.page - 1, pageSize: _query.limit };
    const handlePageChange = (newPage: number) => router.push(`/dashboard/post/?page=${newPage + 1}&per_page=${_query.limit}`);
    if (newData.length === 0) return <NoData />

    return (
        <Paper sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={newData || []}
                columns={columns}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                rowCount={_query.total}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                onPaginationModelChange={(model) => handlePageChange(model.page)}
            />
        </Paper>
    );
}
