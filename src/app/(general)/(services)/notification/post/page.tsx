import { getNotificationPost } from "@/actions/notification/action";
import { action_dataMyUser } from "@/actions/user/actions";
import { GetInfoUser } from "@/session/token";
import { redirect } from "next/navigation";
import RenderItemNotificationCreatePost from "../components/render-item/renderItemCreatePost";
import RenderItemNotificationLikePost from "../components/render-item/renderItemLikePost";
import NoPostNotification from "../components/render-suggested/RenderNoNotificationPost";

export async function generateMetadata() {
    return {
        title: 'Post Notification | Alex Trinh Social',
        description: 'Post Notification | Alex Trinh Social',
        openGraph: {
            title: 'Post Notification | Alex Trinh Social',
            description: 'Post Notification | Alex Trinh Social',
            url: `/notification/follow`,
            type: 'article'
        }
    };
}

export default async function NotificationPost() {
    const user = GetInfoUser()
    if (!user) redirect('/auth/login');
    const { data: dataUser } = await action_dataMyUser();
    const { data: dataNotification } = await getNotificationPost(1, 100);
    const dataNotificationPost = dataNotification?.data
    return (
        <div style={{ marginTop: '10px' }}>
            {dataNotificationPost.length > 0 ?
                <>
                    {dataNotificationPost.map((item: any, index: any) => {
                        const { type } = item?.notification;
                        return (
                            <div key={index}>
                                {type === 1 && <RenderItemNotificationCreatePost data={item} notification={item?.notification} />}
                                {type === 2 && <><RenderItemNotificationLikePost data={item} notification={item?.notification} /></>}
                            </div>
                        )
                    })}
                </>
                : <NoPostNotification myUser={dataUser?.data} />
            }
        </div>
    )
}