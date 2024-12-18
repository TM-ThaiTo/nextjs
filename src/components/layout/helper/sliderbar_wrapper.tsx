import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { FaBars } from "react-icons/fa";
import { sidebarBoxStyle, sidebarWrapperStyle } from '@/components/layout/styles';
import { ActionButton } from '@/components/layout/helper/contants';
import MenuSlider from '@/components/layout/helper/menu_slider';
import { locales } from '@/language/constant';
import { mapLanguage } from '@/helper/mapTypesLanguage';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { logoFull, logoNoFull } from '@/helper/svg_icon';
type Props = {
    isDesktop: boolean;
    isTablet: boolean;
    children: React.ReactNode;
    myUser: any;
    isDashboard?: boolean;
};

const SidebarWrapper = ({ isDesktop, isTablet, children, myUser, isDashboard }: Props) => {
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter();
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const moreButtonRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { actionHoverColor, actionActiveColor, textColorPrimary } = useThemeColors();

    const handleClick = () => {
        if (openMenu) {
            setOpenMenu(false);
        } else {
            if (moreButtonRef.current) {
                const rect = moreButtonRef.current.getBoundingClientRect();
                setMenuPosition({ top: rect.top, left: rect.left });
            }
            setOpenMenu(true);
        }
    };
    const handleClickLogo = () => router.push('/')
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            moreButtonRef.current &&
            !moreButtonRef.current.contains(event.target as Node)
        ) { setOpenMenu(false); }
    };

    useEffect(() => {
        if (openMenu) { document.addEventListener('mousedown', handleClickOutside); }
        else { document.removeEventListener('mousedown', handleClickOutside); }
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [openMenu]);

    return (
        (isDesktop || isTablet) && (
            <>
                <div style={sidebarWrapperStyle(isDesktop) as React.CSSProperties}>
                    <Box sx={sidebarBoxStyle(isDesktop)}>
                        <Box sx={{ width: '100%', height: 80, display: 'flex', cursor: 'pointer' }} onClick={handleClickLogo}>
                            {isTablet
                                ? <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                    {logoNoFull(textColorPrimary)}
                                </div>
                                : <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                    {logoFull(textColorPrimary)}
                                </div>
                            }
                        </Box>
                        <Box sx={{ flexGrow: 1, mt: '10px' }}>
                            {children}
                        </Box>
                        {!isDashboard &&
                            <div ref={moreButtonRef}>
                                <ActionButton icon={<FaBars />}
                                    label={locales[mapLanguage(myUser?.lang)]?.actionHome?.more}
                                    onClick={handleClick}
                                    isDesktop={isDesktop}
                                    isActive={openMenu}
                                    actionActiveColor={actionActiveColor}
                                    actionHoverColor={actionHoverColor}
                                />
                            </div>
                        }
                    </Box>
                </div>

                {openMenu && <MenuSlider menuPosition={menuPosition} menuRef={menuRef} myUser={myUser} />}
            </>
        )
    );
};

export default SidebarWrapper;
