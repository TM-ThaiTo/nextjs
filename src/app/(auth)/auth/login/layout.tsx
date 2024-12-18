
'use client';

import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

type Prop = {
    children: React.ReactNode;
}

export default function LayoutLogin({ children }: Prop) {
    const isMobile = useMediaQuery("(max-width: 780px)");

    return (
        <div style={{ display: 'flex', justifyContent: 'center', maxHeight: 'calc(100vh - 100px)', height: '100%', alignItems: 'center', width: '100%' }}>
            {!isMobile && <div
                style={{
                    width: '370px', // Adjust for phone proportions
                    height: '740px',
                    borderRadius: '60px',
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: '200px',
                        height: '30px',
                        backgroundColor: '#000',
                        borderRadius: '0 0 20px 20px',
                        position: 'absolute',
                        top: '10px',
                        zIndex: 2,
                    }}
                />
                {/* Screen with the Image */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fff',
                        borderRadius: '50px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <Image src={'/static/background.png'} alt="Background"
                        width={370}
                        height={740}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>}
            {children}
        </div>
    )
}