import { useTheme } from '@mui/material/styles';

const useThemeColors = () => {
    const theme = useTheme();

    const textColorPrimary = theme.palette.text.primary;
    const textColorSecondary = theme.palette.text.secondary;
    const backgroundColor = theme.palette.background.paper;
    const tooltipBackgroundColor = theme.palette.tooltip?.backgroundColor;
    const toolTipTextColor = theme.palette.tooltip?.text;
    const borderColor = theme.palette.border?.default;
    const linkColor = theme.palette.link?.default;
    const actionActiveColor = theme.palette.action.active;
    const actionHoverColor = theme.palette.action.hover;
    const boxColor = theme.palette.box?.default;

    return {
        theme,
        textColorPrimary,
        textColorSecondary,
        backgroundColor,
        tooltipBackgroundColor,
        toolTipTextColor,
        borderColor,
        linkColor,
        actionActiveColor,
        actionHoverColor,
        boxColor
    };
};

export default useThemeColors;