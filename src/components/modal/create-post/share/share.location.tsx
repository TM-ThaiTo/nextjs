import { Box } from "@mui/material";
import Input from '@mui/material/Input';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { locales } from "@/language/constant";
import { getLanguage } from "@/helper/mapTypesLanguage";

type Props = {
    setTextLocation: (text: string) => void;
}

export default function InputShareLocation({ setTextLocation }: Props) {
    const lang = getLanguage();
    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignContent: 'center' }}>
            <Input placeholder={locales[lang]?.addLocation} fullWidth={true} />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LocationOnIcon />
            </Box>
        </Box>
    )
}