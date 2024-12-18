import { getAllPostAdmin, getSearchPostAdmin } from "@/actions/post/actions.admin";
import TablePostDashboard from "@/components/dashboard/post/main.post";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import { PageDashboard } from "@/types/page";

export async function generateMetadata() {
    return {
        title: 'Post Dashboard',
        description: "Post Dashboard",
        openGraph: {
            title: 'This is dashboard post',
            description: "This is manage post",
            url: `/dashboard/post`,
            type: 'article',
        }
    }
}

export default async function PostPageDashboard({ searchParams }: PageDashboard) {
    const search = searchParams['search']?.toString().trim() || '';
    const idUser = searchParams['idUser']?.toString().trim() || '';
    const slug = searchParams['slug']?.toString().trim() || '';
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';
    var posts: any[] = [];
    var _query: any = null;

    if (search || idUser || slug) {
        const { data, error } = await getSearchPostAdmin(search, idUser, slug, Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            posts = data?.data?.posts;
            _query = data?.data?._query;
        }
    } else {
        const { data, error } = await getAllPostAdmin(Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            posts = data?.data?.posts;
            _query = data?.data?._query;
        }
    }

    return <TablePostDashboard posts={posts} _query={_query} />
}
