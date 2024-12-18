import { action_AddLike } from "@/actions/user/actions";
import { ILikePost } from "../../types";

export const handleAddLikePost = async (iLike: ILikePost, setIsLoading: any) => {
    try {

        setIsLoading(true);
        const { data, error } = await action_AddLike(iLike);
        if (error) {
            setIsLoading(false);
            console.error("error like post");
        }

        if (data) {
            setIsLoading(false)
        }

    } catch (error) { setIsLoading(false); throw error }
}

