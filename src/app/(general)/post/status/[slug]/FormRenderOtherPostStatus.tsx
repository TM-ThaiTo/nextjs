'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import MyPostsForm from "@/components/user/profile/posts/user-posts";
import { getLanguage } from "@/helper/mapTypesLanguage";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { locales } from "@/language/constant";

type Props = {
    posts: any;
    myUser: any;
};

export default function RenderOtherStatus({ posts, myUser }: Props) {
    const lang = getLanguage();
    const { textColorSecondary, textColorPrimary } = useThemeColors();

    const renderMorePosts = () => {
        return (
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: textColorSecondary, fontWeight: 600, paddingRight: '5px' }}>
                    {locales[lang]?.detailPost?.morePostsFrom}
                </Typography>
                <Link href={`/${myUser?.slug}`} style={{ textDecoration: 'none', color: textColorPrimary }}>
                    <Typography sx={{ fontWeight: 800 }}>
                        {myUser?.fullName || myUser?.slug}
                    </Typography>
                </Link>
            </Box>
        )
    }
    return (
        <>
            {posts && (
                <Box sx={{ height: 'auto', marginTop: '20px' }}>
                    {renderMorePosts()}
                    <MyPostsForm data={posts} />
                </Box>
            )}

        </>
    )
}
