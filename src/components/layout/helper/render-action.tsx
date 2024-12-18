import { actionsHome } from "@/constants/home_actions";
import { ActionLink, ActionButton } from "@/components/layout/helper/contants";
import { AccountCircle, AddCircleOutline } from "@mui/icons-material";
import { locales } from '@/language/constant';
import { mapLanguage } from "@/helper/mapTypesLanguage";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { useState } from "react";
import { ModalCreatePost } from "@/components/modal/create-post/modal.createPost";

type ActionHomeProps = {
    isDesktop: boolean;
    isTablet: boolean;
    themeText: any;
    handleOpenModalCreatePost: () => void;
    myUser: any;
    isPathName?: any;
}
export const RenderActionHome: React.FC<ActionHomeProps> = ({
    isDesktop,
    isTablet,
    themeText,
    handleOpenModalCreatePost,
    myUser,
    isPathName,
}) => {
    const { actionHoverColor, actionActiveColor, textColorPrimary } = useThemeColors();
    const language = mapLanguage(myUser?.lang);

    return (
        <>
            {actionsHome(language, textColorPrimary)?.filter(link => isDesktop || isTablet || link.label !== 'Search').map((link, index) => {
                const isActive = isPathName === link.href;
                return <ActionLink
                    key={index}
                    link={link}
                    isDesktop={isDesktop}
                    themeText={themeText}
                    isActive={isActive}
                    actionActiveColor={actionActiveColor}
                    actionHoverColor={actionHoverColor}
                />
            })}
            <ActionButton
                icon={<AddCircleOutline />}
                label={locales[language]?.actionHome?.createPost}
                onClick={handleOpenModalCreatePost}
                isDesktop={isDesktop}
            />
            <ActionLink
                link={{
                    href: `/${myUser?.slug}`,
                    icon: <AccountCircle />,
                    link: myUser?.avatar,
                    label: locales[language]?.actionHome?.profile
                }}
                isActive={isPathName === `/${myUser?.slug}`}
                isDesktop={isDesktop}
                themeText={themeText}
                actionActiveColor={actionActiveColor}
                actionHoverColor={actionHoverColor}
            />
        </>
    )
}