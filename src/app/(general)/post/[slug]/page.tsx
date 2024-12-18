import { GetInfoUser } from "@/session";
import { PostParams } from "@/utils/lib.types";
import { action_GetDetailPostBySlug, action_GetDetailPostBySlugPublic, action_GetPostPublic } from '@/actions/post/actions';
import { action_GetCommentBySlugPost, action_GetCommentBySlugPostPublic, } from '@/actions/post/comment';
import { DetailPost } from '@/components/post/detail-post/detail-post'
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PostParams) {
    const { data } = await action_GetDetailPostBySlugPublic(params?.slug);
    const name = data?.user?.fullName;
    const description = data?.post?.content ? data?.post?.content : data?.user?.bio
    return {
        title: `${name} | ${description}` || 'This is name',
        description: data?.user?.bio || "This is bio user",
        openGraph: {
            title: `${data?.user?.fullName} | ${data?.user?.bio}` || 'This is name',
            description: description || "This is bio user",
            url: `/post/${params?.slug}`,
            type: 'article',
        }
    }
}
export default async function PostPage({ params }: PostParams) {
    const useLogin: any = await GetInfoUser() || null;
    var data: any = null;
    var comments: any = null;
    var posts: any = null

    if (useLogin) {
        data = await action_GetDetailPostBySlug(params?.slug);
        comments = await action_GetCommentBySlugPost(params?.slug);
        posts = await action_GetPostPublic(params?.slug);
    } else {
        data = await action_GetDetailPostBySlugPublic(params?.slug);
        comments = await action_GetCommentBySlugPostPublic(params?.slug);
        posts = await action_GetPostPublic(params?.slug);
    }

    if (!data) notFound();
    return <DetailPost data={data?.data} comments={comments?.data?.data} myUser={useLogin} posts={posts?.data?.data} />
}