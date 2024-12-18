'use client'

import { useState } from "react";
import Button from "@mui/material/Button";
import NewMessageModal from "../main/modal.new.message";
import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

export default function ButtonCreateGroup() {
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { tooltipBackgroundColor, actionHoverColor, toolTipTextColor } = useThemeColors();

    const [isOpen, setOpen] = useState<boolean>(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    return (
        <>
            <Button variant="contained" sx={{ bgcolor: tooltipBackgroundColor, color: toolTipTextColor, marginTop: 2, '&:hover': { bgcolor: actionHoverColor }, }} onClick={handleOpenModal} >
                {locales[lang]?.message?.messageGroup?.CreateGroup}
            </Button>
            {isOpen && <NewMessageModal open={isOpen} onClose={handleCloseModal} />}
        </>
    )
}