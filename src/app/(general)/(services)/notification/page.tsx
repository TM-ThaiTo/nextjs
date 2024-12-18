import { getNotification } from "@/actions/notification/action";
import NotificationForm from "./components/FormNotification";
import { GetInfoUser } from "@/session/token";
import { redirect } from "next/navigation";
import { action_dataMyUser, getSuggestedUser } from "@/actions/user/actions";

export async function generateMetadata() {
    return {
        title: 'Notification | Alex Trinh Social',
        description: 'Notification | Alex Trinh Social',
        openGraph: {
            title: 'Notification | Alex Trinh Social',
            description: 'Notification | Alex Trinh Social',
            url: `/notification`, type: 'article'
        }
    };
}

export default async function NotificationPage() {
    const user = GetInfoUser()
    if (!user) redirect('/auth/login');

    const { data: dataUser } = await action_dataMyUser();
    const { data } = await getNotification(1, 100);
    const { data: suggestedUser } = await getSuggestedUser();

    return <NotificationForm data={data?.data} suggested={suggestedUser?.data} myUser={dataUser?.data} />
}