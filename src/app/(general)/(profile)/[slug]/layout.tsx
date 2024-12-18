import { ProfileParams } from "@/utils/lib.types";
import { Profile } from '@/components/user/user-info-form/app.info';
import RouteUserInfo from '@/components/user/router-user';
import { notFound } from "next/navigation";
import { action_dataMyUser, getProfileUser } from "@/actions/user/actions";
import FormPrivateProfile from "@/components/user/profile/private/FormPrivateProfile";

export async function generateMetadata({ params }: ProfileParams) {
    const { slug } = params;
    const { data, error } = await getProfileUser(slug);
    if (error) return notFound();
    if (data) {
        const user = data?.user;
        const name = user?.fullName;
        const description = `| @${user?.slug}`
        return {
            title: `${name} ${description} | Profile`,
            description: user?.bio || "This is bio user",
            openGraph: {
                title: `${user?.fullName} | ${user?.bio}` || 'This is name',
                description: description || "This is bio user",
                url: `/post/${params?.slug}`,
                type: 'article',
            }
        }
    }
}
export default async function ProfileLayout({ params, children }: ProfileParams & { children: React.ReactNode }) {
    const { slug } = params;
    const { data, error } = await getProfileUser(slug);
    if (data?.auth?.isBlock) return notFound();

    const { data: dataMyUser, error: errorMyUser } = await action_dataMyUser();
    if (error) return notFound();
    if (data && dataMyUser) {
        const { user, auth } = data
        const { isMe } = auth;
        const { privateAccount } = user;

        if (privateAccount === 1 && !isMe) {
            return (
                <div style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ maxWidth: '940px', width: '100%', height: '100%' }}>
                        <Profile myUser={dataMyUser?.data} data={user} auth={auth} />
                        <FormPrivateProfile />
                    </div>
                </div>
            )
        }
        return (
            <div style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ maxWidth: '940px', width: '100%', height: '100%' }}>
                    <Profile myUser={dataMyUser?.data} data={user} auth={auth} />
                    <RouteUserInfo slug={params?.slug} />
                    {children}
                </div>
            </div>
        )
    }
}