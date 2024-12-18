import { getGroupBySlug } from "@/actions/chat/group/conversation/actions";
import LayoutMessageBySlugRoomGroup from "./LayoutMessageBySlugRoomGroup";

export async function generateMetadata({ params }: any) {
    return {
        title: 'Message Group Room',
        description: 'Message Group Room',
        openGraph: { title: 'Message Group Room', description: 'Message Group Room', url: `/message/groups/${params.slug}`, type: 'article' }
    };
}

export default async function LayoutMessageGroup({ params, children }: { params: { slug: string }, children: React.ReactNode }) {
    const slug = params?.slug;
    const { data } = await getGroupBySlug(slug);
    return (
        <LayoutMessageBySlugRoomGroup data={data?.data}>
            {children}
        </LayoutMessageBySlugRoomGroup>
    )
}