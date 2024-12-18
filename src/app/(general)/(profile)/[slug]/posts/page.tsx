import { getProfileUser } from "@/actions/user/actions";
import { ProfileParams } from "@/utils/lib.types";
import { notFound, redirect } from "next/navigation";

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
export default function PostsPage({ params }: ProfileParams) {
    return redirect(`/${params.slug}`)
}
