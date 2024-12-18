import { getAllConversation, searchConversation } from "@/actions/chat/p2p/conversation/actions.admin";
import TableConversationDashboard from "@/components/dashboard/conversation/main.table.conversation";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import { PageDashboard } from "@/types/page";

export default async function ConversationPageDashboard({ searchParams }: PageDashboard) {

    const id = searchParams['id']?.toString().trim() || '';
    const slug = searchParams['slug']?.toString().trim() || '';
    const creator = searchParams['creator']?.toString().trim() || '';
    const recipient = searchParams['recipient']?.toString().trim() || '';
    const status = searchParams['status']?.toString().trim() || '';
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '2';

    var conversations: any[] = [];
    var _query: any = null;
    var url = '/dashboard/conversation';

    if (id || slug || creator || recipient || status) {
        const { data, error } = await searchConversation(Number(page), Number(per_page), id, slug, creator, recipient);
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            conversations = data?.data?.conversations;
            _query = data?.data?._query;
            url = '/dashboard/conversation/search?';
        }
    } else {
        const { data, error } = await getAllConversation(Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            conversations = data?.data?.conversations;
            _query = data?.data?._query;
            url = '/dashboard/conversation?';
        }
    }

    return <TableConversationDashboard conversations={conversations} _query={_query} url={url} />
}