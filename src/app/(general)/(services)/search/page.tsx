import Box from "@mui/material/Box";
import FormSearchPage from "./FormSearchPage";
import { style_main } from "@/style/style_mui/style.page";

export async function generateMetadata() {
    return {
        title: 'Search | Alex Trinh Social',
        description: 'Search | Alex Trinh Social',
        openGraph: { title: 'Search | Alex Trinh Social', description: 'Search | Alex Trinh Social', url: `/search`, type: 'article' }
    };
}

export default function SearchPage() {
    return (
        <Box sx={style_main}>
            <FormSearchPage />
        </Box>
    )
}