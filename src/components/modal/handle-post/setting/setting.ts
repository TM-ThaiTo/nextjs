import { mapLanguage } from "@/helper/mapTypesLanguage";
import { locales } from '@/language/constant';

export const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 'auto',
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 24,
    borderRadius: 5,
};

export const buttonStyles = {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    borderBottom: '0.5px solid gray',
}

export const actionCustomers = [
    {
        label: 'Report',
        color: 'red',
        type: 2,
        handle: 'handleReportPost'
    },
    {
        label: 'Unfollow',
        label1: 'Follow',
        color: 'red',
        type: 2,
        handle: 'handleFollow',
    },
    {
        label: 'Add to favorites',
        color: 'textColorPrimary',
        type: 2,
        handle: 'handleAddFavorites',
    },
    {
        label: 'Go to post',
        color: 'textColorPrimary',
        type: 1
    },
    {
        label: 'Share',
        color: 'textColorPrimary',
        type: 2,
        handle: 'handleSharePost'
    },
    {
        label: 'Copylink',
        color: 'textColorPrimary',
        type: 2,
        handle: 'handleCopyLink'
    },
    { label: 'Embed', color: 'textColorPrimary', type: 2, handle: 'handleEmbed' },
    { label: 'About this account', color: 'textColorPrimary', type: 2 },
];

export const actionAuthors = (lang: any) => [
    {
        label: locales[mapLanguage(lang)]?.deletePost,
        type: 2,
        color: 'red',
        handle: 'handleDeletePost'
    },
    {
        label: locales[mapLanguage(lang)]?.editPost,
        type: 2,
        color: 'red',
        handle: 'handleEditPost'
    },
    {
        label: locales[mapLanguage(lang)]?.openLikeCountToOthers,
        label1: locales[mapLanguage(lang)]?.hideLikeCountToOthers,
        type_action: 1, // 1: like,
        type: 2,
        color: 'textColorPrimary',
        handle: 'handleLikePost'
    },
    {
        label: locales[mapLanguage(lang)]?.turnOffCommenting,
        label1: locales[mapLanguage(lang)]?.turnOnCommenting,
        type_action: 2, // 2: comment
        type: 2,
        color: 'textColorPrimary',
        handle: 'handleCommentPost'
    },
    {
        label: locales[mapLanguage(lang)]?.privatePost,
        label1: locales[mapLanguage(lang)]?.publicPost,
        type_action: 3, // 3: public
        type: 2,
        color: 'textColorPrimary',
        handle: 'handlePublicPost'
    },
    {
        label: locales[mapLanguage(lang)]?.goToPost,
        type: 1,
        color: 'textColorPrimary'
    },
    {
        label: locales[mapLanguage(lang)]?.aboutThisAccount,
        type: 2,
        color: 'textColorPrimary',
        handle: 'handleAboutAccount'
    },
];