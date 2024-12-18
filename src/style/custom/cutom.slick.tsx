import React, { CSSProperties } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

interface ArrowProps {
    onClick?: () => void;
    style?: CSSProperties;
}

const CustomPrevArrow = (prop: ArrowProps) => (
    <ButtonBase
        onClick={prop.onClick}
        sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            zIndex: 1,
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            color: 'white',
            backgroundColor: '#9e9b9b',
            '&:hover': {
                backgroundColor: 'gray',
            },
            fontSize: 50,
        }}
    >
        <ArrowBackIos style={{ paddingLeft: 5 }} />
    </ButtonBase>
);

const CustomNextArrow = (prop: ArrowProps) => (
    <ButtonBase
        onClick={prop.onClick}
        sx={{
            position: 'absolute',
            top: '50%',
            right: '0px', // Ensure the button stays in the correct position
            zIndex: 1,
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            color: 'white',
            backgroundColor: '#9e9b9b',
            '&:hover': {
                backgroundColor: 'gray',
            },
            fontSize: 30,
        }}
    >
        <ArrowForwardIos style={{ paddingLeft: 5 }} />
    </ButtonBase>
);


export { CustomPrevArrow, CustomNextArrow };
