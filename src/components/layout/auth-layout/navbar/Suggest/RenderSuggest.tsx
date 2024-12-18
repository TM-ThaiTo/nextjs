'use client'

import { useEffect, useState } from "react"
import ItemUserSuggest from "./RenderItemUser";
import { Typography } from "@mui/material";
import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

type Props = {
    myUser: any;
    suggestedUser?: any;
    isNotifacationPage?: boolean;
}
export default function RenderSuggested({ myUser, suggestedUser, isNotifacationPage }: Props) {
    const { useThemeColors, lang, locales } = importThemeAndLanguge();
    const { textColorSecondary } = useThemeColors();
    return (
        <>
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: textColorSecondary, mb: 1 }}>{locales[lang]?.contacts?.suggestedForYou}</Typography>
            {suggestedUser && suggestedUser.length > 0 ?
                <>
                    <div style={{ overflowY: 'scroll', height: '100%', maxHeight: 320, marginTop: '5px' }}>
                        {suggestedUser?.map((item: any, index: any) => {
                            return <div key={index}> <ItemUserSuggest item={item} myUser={myUser} isNotifacationPage={isNotifacationPage} /></div>
                        })}
                    </div>
                </>
                :
                <>
                    no suggest
                </>}
        </>
    )
}