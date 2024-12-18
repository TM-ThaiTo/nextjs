import { action_getReels } from "@/actions/post/actions";
import ReelsList from "./components/ReelList";
import { action_dataMyUser } from "@/actions/user/actions";

export default async function ReelsPage() {
    const { data, error } = await action_getReels(1, 3);
    const { data: dataU, error: errorU } = await action_dataMyUser();

    const user = {
        ...dataU?.data,
        id: dataU?.data?._id
    }
    return <ReelsList data={data?.data} myUser={user} />
}