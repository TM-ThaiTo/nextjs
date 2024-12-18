import {
    action_DeletePost,
    action_HandleCommentPost,
    action_HandleLikePost,
    action_HandlePublicPost
} from '@/actions/post/actions';

import { IOnePost } from '@/types/post';

export const handleEditPost = (data: any) => {
    alert("Tính năng đang phát triển")
}

export const handleAboutAccount = (data: any) => {
    alert("Tính năng đang phát triển")
}

export const handleLikePost = async (dataPost: IOnePost, setAlert: any, handleCloseModal: any, setIsLoading: any, setData: any) => {
    setIsLoading(true);
    const slug = dataPost?.post?.slug;
    const { data, error } = await action_HandleLikePost(slug);
    if (error) {
        setIsLoading(false);
        setAlert({ open: true, type: 'error', message: error?.message });
    }
    if (data) {
        setAlert({ open: true, type: 'success', message: data?.message })
        setData((prev: IOnePost) => ({
            ...prev,
            post: {
                ...prev.post,
                hideLikes: !prev?.post?.hideLikes,
            },
        }));
        setIsLoading(false);
        handleCloseModal();
    }
}

export const handleCommentPost = async (dataPost: IOnePost, setAlert: any, handleCloseModal: any, setIsLoading: any, setData: any) => {
    setIsLoading(true);
    const slug = dataPost?.post?.slug;
    const { data, error } = await action_HandleCommentPost(slug);
    if (error) {
        setIsLoading(false);
        setAlert({ open: true, type: 'error', message: error?.message });
    }
    if (data) {
        setAlert({ open: true, type: 'success', message: data?.message })
        setData((prev: IOnePost) => ({
            ...prev,
            post: {
                ...prev.post,
                openComment: !prev?.post?.openComment,
            },
        }));
        setIsLoading(false);
        handleCloseModal();
    }
}

export const handleDeletePost = async (dataPost: IOnePost, setAlert: any, handleCloseModal: any, setIsLoading: any) => {
    setIsLoading(true);
    const id = dataPost?.post?._id;
    const { data, error } = await action_DeletePost(id);
    if (error) {
        setIsLoading(false);
        setAlert({ open: true, type: 'error', message: error?.message })
    }
    if (data) {
        setAlert({ open: true, type: 'success', message: data?.message })
        setIsLoading(false);
        handleCloseModal();
    }
}

export const handlePublicPost = async (dataPost: IOnePost, setAlert: any, handleCloseModal: any, setIsLoading: any, setData: any, setDataPost: any) => {
    setIsLoading(true);
    const slug = dataPost?.post?.slug;
    const { data, error } = await action_HandlePublicPost(slug);
    if (error) {
        setIsLoading(false);
        setAlert({ open: true, type: 'error', message: error?.message });
    }
    if (data) {
        setAlert({ open: true, type: 'success', message: data?.message })
        setData((prev: IOnePost) => ({
            ...prev,
            post: {
                ...prev.post,
                openPublic: !prev?.post?.openPublic,
            },
        }));
        setDataPost((prev: IOnePost) => ({
            ...prev,
            post: {
                ...prev.post,
                openPublic: !prev?.post?.openPublic,
                status: !prev?.post?.openPublic === true ? 1 : 2
            },
        }));
        setIsLoading(false);
        handleCloseModal();
    }
}