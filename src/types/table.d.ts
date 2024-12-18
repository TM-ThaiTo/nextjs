import { IAccount, IRole, IUser } from '@/types/dashboard';

type Order = 'asc' | 'desc';
interface HeadCell {
    disablePadding: boolean;
    id: keyof IUser | keyof IAccount | keyof IRole;
    label: string;
    numeric: boolean;
}

export {
    HeadCell,
    Order
}