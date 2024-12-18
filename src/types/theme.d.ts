import { Palette } from '@mui/material/styles';

// Extending MUI Palette interface to add custom fields
declare module '@mui/material/styles' {
    interface Palette {
        tooltip?: {
            backgroundColor: string;
            text: string;
        };
        border?: {
            default: string;
            hover: string;
        };
        link?: {
            default: string;
            hover: string;
        },
        box?: {
            default: string;
        },
    }

    interface PaletteOptions {
        tooltip?: {
            backgroundColor: string;
            text: string;
        };
        border?: {
            default: string;
            hover: string;
        };
        link?: {
            default: string;
            hover: string;
        },
        box?: {
            default: string;
        }
    }
}