import { action_AddFollow, action_UnFollow } from "@/actions/user/actions";
import { IFollow } from "../../types";


export const handleAddFollow = async (follow: IFollow, setAlert: any, setIsLoading: any) => {
    try {
        setIsLoading(true);
        const { data, error } = await action_AddFollow(follow);
        if (error) {
            setIsLoading(false);
            setAlert({ open: true, type: 'error', message: error?.message });
        }
        if (data) {
            setIsLoading(false);
            setAlert({ open: true, type: 'success', message: data?.message })
        }
    } catch (error) { setIsLoading(false); console.error('===> handleAddFollow', error) }
}

export const handleUnFollow = async (follow: IFollow, setAlert: any, setIsLoading: any) => {
    try {
        setIsLoading(true);

        const { data, error } = await action_UnFollow(follow);
        if (error) {
            setIsLoading(false);
            setAlert({ open: true, type: 'error', message: error?.message });
        }

        if (data) {
            setIsLoading(false);
            setAlert({ open: true, type: 'success', message: data?.message })
        }

    } catch (error) { setIsLoading(false); console.error('===> handleAddFollow', error) }
}