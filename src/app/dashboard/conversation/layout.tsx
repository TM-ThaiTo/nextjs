import SearchConversationDashboard from "@/components/dashboard/conversation/search.conversation";
import TopTableConversation from "@/components/dashboard/conversation/top.table.conversation";
import Box from "@mui/material/Box";

type Props = {
    children: React.ReactNode;
}

export default function LayoutConversationDashboard({ children }: Props) {
    return (
        <Box sx={{ p: 2 }}>
            <SearchConversationDashboard />
            <TopTableConversation />
            {children}
        </Box>
    )
}