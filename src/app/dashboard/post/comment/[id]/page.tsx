import { getAllCommentByIdPost, searchCommentByIdPost } from "@/actions/comment/action.admin";
import TableCommentDashboardWithPost from "@/components/dashboard/comment/main.comment";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import { PageIdAndQuery } from "@/types/page";

export default async function CommentPostPageDashboard({ params, searchParams }: PageIdAndQuery) {
    const id = params?.id;
    const search = searchParams['search']?.toString()?.trim() ?? '';
    const idPost = searchParams['idPost']?.toString()?.trim() ?? '';
    const idUser = searchParams['idUser']?.toString()?.trim() ?? '';
    const idComment = searchParams['idComment']?.toString()?.trim() ?? '';
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    var comments: any[] = [];
    var _query: any = null;
    var url: string = '';

    if (search || idPost || idUser || idComment) {
        const { data, error } = await searchCommentByIdPost(id, Number(page), Number(per_page), search, idUser, idComment);
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            comments = data?.data?.comments as any[];
            _query = data?.data?._query;
            url = `/dashboard/post/comment/${id}?search=${search}&idPost=${idPost}&idUser=${idUser}&idComment=${idComment}`;
        }
    } else {
        const { data, error } = await getAllCommentByIdPost(id, Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            comments = data?.data?.comments as any[];
            _query = data?.data?._query;
            url = `/dashboard/post/comment/${id}?`;
        }
    }

    return (
        <TableCommentDashboardWithPost
            id={id}
            comments={comments || []}
            _query={_query}
            url={url}
        />
    )
}