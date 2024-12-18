'use client';

import SearchPostDashboard from "@/components/dashboard/post/search.post";
import TopTablePost from "@/components/dashboard/post/top.table.post";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";

type Props = {
    children: React.ReactNode;
}

export default function LayoutPostDashboard({ children }: Props) {
    const pathname = usePathname();
    const isMainRoute = pathname === '/dashboard/post';

    return (
        <Box sx={{ p: 2 }}>
            {isMainRoute && (
                <>
                    <SearchPostDashboard />
                    <TopTablePost />
                </>
            )}
            {children}
        </Box>
    );
}
