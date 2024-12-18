import { createTheme } from '@mui/material';

export const colorTokens = {
    background: { light: "#FFFFFF", dark: "#000000" },
    toolTip: { light: "#dddddd", dark: "#FFFFFF" },
    text: {
        primary: { light: "#000000", dark: "#FFFFFF" },
        secondary: { light: "#666666", dark: "#B0B0B0" },
        toolTip: { light: "#000000", dark: "#000000" }
    },
    action: {
        hover: { light: "#F0F0F0", dark: "#333333" },
        active: { light: "#e5e5e5", dark: "#444444" }
    },
    border: { light: "#E0E0E0", dark: "#262626" },
    link: { light: "#007bff", dark: "#007bff" },
    box: { light: "#FFFFFF", dark: "#262626" }
};

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    background: {
                        default: colorTokens.background.dark,
                        paper: colorTokens.background.dark,
                    },
                    text: {
                        primary: colorTokens.text.primary.dark,
                        secondary: colorTokens.text.secondary.dark,
                    },
                    action: {
                        active: colorTokens.action.active.dark,
                        hover: colorTokens.action.hover.dark,
                    },
                    tooltip: {
                        backgroundColor: colorTokens.toolTip.dark,
                        text: colorTokens.text.toolTip.dark,
                    },
                    border: {
                        default: colorTokens.border.dark,
                        hover: colorTokens.action.hover.dark,
                    },
                    link: {
                        default: colorTokens.link.dark,
                        hover: colorTokens.link.dark,
                    },
                    box: {
                        default: colorTokens.box.dark
                    }
                }
                : { // light mode
                    background: {
                        default: colorTokens.background.light,
                        paper: colorTokens.background.light,
                    },
                    tooltip: {
                        backgroundColor: colorTokens.toolTip.light,
                        text: colorTokens.text.toolTip.light,
                    },
                    text: {
                        primary: colorTokens.text.primary.light,
                        secondary: colorTokens.text.secondary.light,
                    },
                    action: {
                        active: colorTokens.action.active.light,
                        hover: colorTokens.action.hover.light,
                    },
                    border: {
                        default: colorTokens.border.light,
                        hover: colorTokens.action.hover.light,
                    },
                    link: {
                        default: colorTokens.link.light,
                        hover: colorTokens.link.light,
                    },
                    box: {
                        default: colorTokens.box.light
                    }
                }),
        },
        typography: {
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            fontSize: 14,
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 700,
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
            },
            body1: {
                fontSize: '1rem',
            },
            body2: {
                fontSize: '0.875rem',
            },
        },
    });
