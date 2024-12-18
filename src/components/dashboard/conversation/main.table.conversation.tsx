'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { tableCoversation } from '@/constants/row_table';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { filterConversation } from '@/utils/filter/post';
import NoData from '@/components/no-data/no-data';
import ActionsTableConversations from './action.table.conversation';

type Props = {
    conversations: any[];
    _query: any;
    url: string;
};

export default function TableConversationDashboard({ conversations, _query, url }: Props) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentRowId, setCurrentRowId] = useState<{ id: string, slug: string, idUser: string }>();
    const columns: GridColDef[] = [
        ...tableCoversation,
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
                    <ActionsTableConversations id={id} open={open} anchorEl={anchorEl} currentRowId={currentRowId} handleClick={handleClick} handleClose={handleClose} />
                );
            },
        },
    ];
    const newData = filterConversation(conversations);
    const { page, limit, total } = _query;
    const [paginationModel, setPaginationModel] = useState({ page: page - 1, pageSize: limit, });
    const handlePageChange = (model: any) => {
        const newPage = model.page + 1;
        const newPageSize = model.pageSize;
        setPaginationModel(model);
        router.push(`${url}page=${newPage}&per_page=${newPageSize}`);
    };
    return (
        <Paper sx={{ height: 'auto', width: '100%' }}>
            {conversations.length > 0 && newData.length > 0 ? (
                <DataGrid
                    rows={newData || []}
                    columns={columns}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    rowCount={total}
                    pageSizeOptions={[5, 10, 50]}
                    disableRowSelectionOnClick
                    onPaginationModelChange={handlePageChange}
                    getRowClassName={(params) => params.row.reports > 50 ? 'highReportRow' : ''}
                />
            ) : <NoData />}
        </Paper>
    );
}
