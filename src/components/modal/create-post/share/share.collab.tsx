import { Box } from "@mui/material";
import Input from '@mui/material/Input';
import GroupsIcon from '@mui/icons-material/Groups';
import { getLanguage } from "@/helper/mapTypesLanguage";
import { locales } from "@/language/constant";

type Props = {
    setTextCollabrator: (text: string) => void;
}
export default function InputShareCollabrator({ setTextCollabrator }: Props) {
    const lang = getLanguage();

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignContent: 'center' }}>
            <Input
                placeholder={locales[lang]?.addCollabrators}
                fullWidth={true}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GroupsIcon />
            </Box>
        </Box>
    )
}