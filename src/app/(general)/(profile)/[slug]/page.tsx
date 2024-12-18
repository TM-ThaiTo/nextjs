import { ProfileParams } from "@/utils/lib.types";
import LoadPostProfile from '@/components/user/profile/posts/load-post';
import { Response_GetMyPost } from "@/types/post";
import { api } from "@/utils/api";
import { action_dataMyUser } from "@/actions/user/actions";
import NoPostNotification from "../../(services)/notification/components/render-suggested/RenderNoNotificationPost";

export default async function ProfilePage({ params }: ProfileParams) {
    const slug = params?.slug;

    const { data: dataUser } = await action_dataMyUser();
    const { data, error } = await api<Response_GetMyPost>(`/post/user/${slug}?page=${1}&limit=${7}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (error) { }
    if (data) return (
        <>
            {data?.data.length > 0
                ? <LoadPostProfile data={data.data} slug={params?.slug} />
                : <NoPostNotification myUser={dataUser?.data} type={1} />
            }
        </>
    );
}