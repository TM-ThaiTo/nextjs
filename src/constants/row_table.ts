import { GridColDef } from "@mui/x-data-grid";

const TypeAccount = {
    1: 'LOCAL',
    2: 'GOOGLE',
    3: 'GITHUB',
}

const nameTable = {
    customer: 'Table Customers',
    account: 'Table Accounts',
    role: 'Table Roles',
}

const tableCustomers = [
    { id: '_id', numeric: false, disablePadding: false, label: 'ID', maxWidth: '10%' },
    { id: 'fullName', numeric: false, disablePadding: false, label: 'Full Name' },
    { id: 'slug', numeric: false, disablePadding: false, label: 'User Name' },
    { id: 'idAccount', numeric: false, disablePadding: false, label: 'ID Account' },
    { id: 'follower', numeric: false, disablePadding: false, label: 'Followers' },
    { id: 'following', numeric: false, disablePadding: false, label: 'Following' },
    { id: 'posts', numeric: false, disablePadding: false, label: 'Posts' },
    { id: 'reports', numeric: false, disablePadding: false, label: 'Reports' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Updated At' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action', maxWidth: '70px' },
];

const tableAccounts = [
    { id: '_id', numeric: false, disablePadding: false, label: 'ID', maxWidth: '10%' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', maxWidth: '20%' },
    { id: 'userName', numeric: false, disablePadding: false, label: 'User Name', maxWidth: '20%' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type', maxWidth: '10%' },
    { id: 'roles', numeric: false, disablePadding: false, label: 'Roles', maxWidth: '10%' },
    { id: 'failedLogin', numeric: true, disablePadding: false, label: 'Failed Login', maxWidth: '71px' },
    { id: 'verifyAccount', numeric: true, disablePadding: false, label: 'Verify Account', maxWidth: '90px' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At', maxWidth: '10%' },
    { id: 'updatedAt', numeric: true, disablePadding: false, label: 'Updated At', maxWidth: '10%' },
    { id: 'action', numeric: true, disablePadding: false, label: 'Action', maxWidth: '70px' },
]

const tableRoles = [
    { id: '_id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'roleName', numeric: false, disablePadding: false, label: 'Role Name' },
    { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

const tablePermissions = [
    { id: '_id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'module', numeric: false, disablePadding: false, label: 'Module' },
    { id: 'permissionName', numeric: false, disablePadding: false, label: 'Permission Name' },
    { id: 'method', numeric: false, disablePadding: false, label: 'Method' },
    { id: 'enpoint', numeric: false, disablePadding: false, label: 'Enpoint' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
]

const tablePost: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'slug', headerName: 'Slug', width: 150 },
    { field: 'idUser', headerName: 'ID User', width: 220 },
    { field: 'title', headerName: 'Title', width: 75 },
    { field: 'type', headerName: 'Type', width: 75 },
    { field: 'status', headerName: 'Status', width: 75 },
    { field: 'content', headerName: 'Content', width: 150 },
    { field: 'hideLikes', headerName: 'HideLikes', width: 90 },
    { field: 'likes', headerName: 'Likes', width: 75 },
    { field: 'openComment', headerName: 'Open Comment', width: 130 },
    { field: 'comments', headerName: 'Comments', width: 90 },
    { field: 'flag', headerName: 'Flag', width: 75 },
    { field: 'reports', headerName: 'Reports', width: 75 },
]
const tablePostFields = ["_id", "slug", 'idUser', "title", "type", "status", "content", "hideLikes", "likes", "openComment", "comments", "flag", "reports",];

const tableComment: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'idPost', headerName: 'ID Post', width: 220 },
    { field: 'idUser', headerName: 'ID User', width: 220 },
    { field: 'content', headerName: 'Content', width: 220 },
    { field: 'like', headerName: 'Likes', width: 75 },
    { field: 'reply', headerName: 'Reply', width: 75 },
    { field: 'reports', headerName: 'Reports', width: 75 },
    { field: 'isDeleted', headerName: 'Deleted', width: 75 },
    { field: 'isHide', headerName: 'Hide', width: 75 },
    { field: 'updatedAt', headerName: 'Updated At', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
]
const tableCommentFields = ["_id", "idPost", "idUser", "content", "like", "reply", "reports", "isDeleted", "isHide", "createdAt", "updatedAt",];

const tableCoversation: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'slug', headerName: 'Slug', width: 220 },
    { field: 'creator', headerName: 'Creator', width: 220 },
    { field: 'recipient', headerName: 'Recipient', width: 220 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'idLastMessage', headerName: 'ID Last Message', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 120 },
]
const tableCoversationFields = ["_id", "slug", "creator", "recipient", "status", "idLastMessage", "createdAt", "updatedAt",];

export {
    nameTable,
    TypeAccount,
    tableCustomers,
    tableAccounts,
    tableRoles,
    tablePermissions,
    tablePost, tablePostFields,
    tableComment, tableCommentFields,
    tableCoversation, tableCoversationFields,
}