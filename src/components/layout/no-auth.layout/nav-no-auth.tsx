import Footer from "@/components/footer/Footer"
import { Box } from "@mui/material"

type NoAuthProps = {
    children: React.ReactNode,
}

export const NavBarNoAuth = ({ children }: NoAuthProps) => {
    return (
        <>
            <div style={{ height: '100vh', width: '100%' }}>
                {children}
                <Footer />
            </div>
        </>
    )
}