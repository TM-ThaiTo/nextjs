import { getNotificationFollow } from "@/actions/notification/action";
import RenderItemRequsetFollow from "../components/render-item/renderRequestFollow";
import { action_dataMyUser, getSuggestedUser } from "@/actions/user/actions";
import { GetInfoUser } from "@/session/token";
import { redirect } from "next/navigation";
import RenderSuggestedRecommend from "../components/render-suggested/RenderSuggestedRecomment";

export async function generateMetadata() {
    return {
        title: 'Follow Notification | Alex Trinh Social',
        description: 'Follow Notification | Alex Trinh Social',
        openGraph: {
            title: 'Follow Notification | Alex Trinh Social',
            description: 'Follow Notification | Alex Trinh Social',
            url: `/notification/follow`,
            type: 'article'
        }
    };
}

export default async function FollowNotificationPage() {
    const user = GetInfoUser()
    if (!user) redirect('/auth/login');

    const { data: dataUser } = await action_dataMyUser();
    const { data, error } = await getNotificationFollow(1, 10);
    const notificationFollow = data?.data;
    if (error) return;
    const { data: suggestedUser } = await getSuggestedUser();
    return (
        <div style={{ marginTop: '10px' }}>
            {notificationFollow.length > 0 ?
                <>
                    {notificationFollow.map((item: any, index: any) => {
                        const { type } = item?.notification;
                        return (
                            <div key={index}>
                                {type === 5 && <RenderItemRequsetFollow data={item} notification={item?.notification} />}
                            </div>
                        )
                    })}
                </>
                : <RenderSuggestedRecommend type={2} suggested={suggestedUser?.data} myUser={dataUser?.data} />}
        </div>
    )
}