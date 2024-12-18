import SearchCommentDashboard from "@/components/dashboard/comment/search.comment";
import TopTableComment from "@/components/dashboard/comment/top.table.comment";
import Box from "@mui/material/Box";

type Props = {
    children: React.ReactNode;
    params: {
        id: string;
    }
}

export default function LayoutCommentWithIdPost({ children, params }: Props) {
    const id = params?.id;
    return (
        <Box sx={{ p: 2 }}>
            <SearchCommentDashboard id={id} />
            <TopTableComment id={id} />
            {children}
        </Box>
    )
}