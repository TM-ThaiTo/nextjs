import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings';
import { iconHashTag, iconNoUseContent, iconReel } from "@/helper/svg_icon";

import { locales } from '@/language/constant';
import { getLanguage } from "@/helper/mapTypesLanguage";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
type Props = {
    open: boolean;
    onClose: () => void;
    isPrivateAccount: boolean;
    handleUpdate: () => void;
};
const styleListContent = { fontSize: 15, mb: 1.5, ml: 2, mr: 2, fontWeight: 600, }
export default function ModalConfirmPrivacy({ open, onClose, isPrivateAccount, handleUpdate }: Props) {
    const lang = getLanguage();
    const { textColorPrimary, borderColor, linkColor } = useThemeColors();

    const renderClausePrivateAccount = () => {
        return (
            <>
                <Box sx={{ textAlign: "center", mb: 2, height: 50, }} >
                    <Typography id="privacy-modal-title" sx={{ color: textColorPrimary, fontSize: 20, fontWeight: 700, }} >
                        {`${locales[lang]?.pricacy?.switchToPrivateAccount}?`}
                    </Typography>
                </Box>

                <Box sx={{ mb: 3, overflowY: 'scroll', maxHeight: 300, }}>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {iconReel(40, textColorPrimary)}
                        </Box>
                        <Typography sx={{ ...styleListContent, color: textColorPrimary, }} >
                            {locales[lang]?.pricacy?.onlyYourFollowers}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {iconHashTag(40, textColorPrimary)}
                        </Box>
                        <Typography sx={{ color: textColorPrimary, ...styleListContent, }} >
                            {locales[lang]?.pricacy?.tagOrHashtag}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {iconNoUseContent(40, textColorPrimary)}
                        </Box>
                        <Typography sx={{ ...styleListContent, color: textColorPrimary, }} >
                            {locales[lang]?.pricacy?.noUseYourContent}
                        </Typography>
                    </Box>
                </Box>
            </>
        )
    }
    const renderClausePublicAccount = () => {
        return (
            <>
                <Box sx={{ textAlign: "center", mb: 2, height: 50, }} >
                    <Typography id="privacy-modal-title" sx={{ color: textColorPrimary, fontSize: 20, fontWeight: 700, }} >
                        {`${locales[lang]?.pricacy?.switchToPublicAccount}?`}
                    </Typography>
                </Box>

                <Box sx={{ mb: 3, overflowY: 'scroll', maxHeight: 300, }}>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {iconReel(40, textColorPrimary)}
                        </Box>
                        <Typography sx={{ ...styleListContent, color: textColorPrimary, }} >
                            {locales[lang]?.pricacy?.anyoneCanSeeYourPosts}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {iconHashTag(40, textColorPrimary)}
                        </Box>
                        <Typography sx={{ color: textColorPrimary, ...styleListContent, }} >
                            {locales[lang]?.pricacy?.hashTagPublic}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {iconNoUseContent(40, textColorPrimary)}
                        </Box>
                        <Typography sx={{ ...styleListContent, color: textColorPrimary, }} >
                            {locales[lang]?.pricacy?.useYourContent}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        <Box sx={{ width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SettingsIcon sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography sx={{ ...styleListContent, color: textColorPrimary, }} >
                            {locales[lang]?.pricacy?.settingYourContent}
                        </Typography>
                    </Box>
                </Box>
            </>
        )
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="privacy-modal-title"
            aria-describedby="privacy-modal-description"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}
        >
            <Box
                sx={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: 24, borderRadius: 2, p: 3, overflow: "auto",
                    width: "100%", maxWidth: 440,
                    maxHeight: 520, height: '100%',
                    minHeight: 250,
                    bgcolor: borderColor,
                    border: `1px solid ${borderColor}`,
                }}
            >
                {isPrivateAccount ? renderClausePublicAccount() : renderClausePrivateAccount()}

                <Box sx={{ display: "flex", flexDirection: 'column-reverse', }} >
                    <Button onClick={onClose} variant="outlined" sx={{ flex: 1, borderColor: borderColor, color: textColorPrimary, }} >
                        {locales[lang]?.cancel}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ flex: 1, bgcolor: linkColor, color: "#fff", "&:hover": { bgcolor: linkColor, }, }}
                        onClick={handleUpdate}
                    >
                        {locales[lang]?.pricacy?.switchToPrivateAccount}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
