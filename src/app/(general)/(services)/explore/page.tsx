import { action_getExplore } from "@/actions/post/actions";
import LoadExplore from "./component/LoadExplore";

export async function generateMetadata() {
    return {
        title: 'Explore | Alex Trinh Social',
        description: 'Explore | Alex Trinh Social',
        openGraph: { title: 'Explore | Alex Trinh Social', description: 'Explore | Alex Trinh Social', url: `/explore`, type: 'article' }
    };
}


export default async function ExplorePage() {
    const page = 1
    const limit = 10;
    const { data, error } = await action_getExplore(page, limit);
    return <LoadExplore data={data?.data} page={page} limit={limit} />
}