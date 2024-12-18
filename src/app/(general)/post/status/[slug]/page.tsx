import Box from "@mui/material/Box";
import { action_GetDetailPostBySlug, action_GetDetailPostBySlugPublic, action_GetPostPublic } from "@/actions/post/actions";
import { action_GetCommentBySlugPost, action_GetCommentBySlugPostPublic } from "@/actions/post/comment";
import { action_dataMyUser } from "@/actions/user/actions";
import { GetInfoUser } from "@/session/token";
import { PostParams } from "@/utils/lib.types";
import FormPostStatus from "./FormPostStatus";
import RenderOtherStatus from "./FormRenderOtherPostStatus";
import { style_main } from "@/style/style_mui/style.page";

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
export default async function StatusPost({ params }: PostParams) {
    const slug = params?.slug
    const useLogin: any = await GetInfoUser() || null;
    var data: any = null;
    var comments: any = null;
    var posts: any = null
    var user: any = null;
    if (useLogin) {
        data = await action_GetDetailPostBySlug(slug);
        comments = await action_GetCommentBySlugPost(slug);
        posts = await action_GetPostPublic(slug);
        const dataUser = await action_dataMyUser();
        user = {
            ...dataUser?.data?.data,
            id: dataUser?.data?.data._id,
        }
        return (
            <Box sx={style_main}>
                <Box sx={{ width: '100%', maxWidth: 935 }}>
                    <FormPostStatus posts={posts?.data?.data} data={data?.data} comments={comments?.data?.data} myUser={user} />
                    <RenderOtherStatus posts={posts?.data?.data} myUser={user} />
                </Box>
            </Box>
        )
    } else {
        data = await action_GetDetailPostBySlugPublic(slug);
        comments = await action_GetCommentBySlugPostPublic(slug);
        posts = await action_GetPostPublic(slug);
        return <FormPostStatus posts={posts?.data?.data} data={data?.data} comments={comments?.data?.data} myUser={user} />
    }
}