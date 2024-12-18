type Props = {
    children: React.ReactNode;
}

export default function LayoutExplore({ children }: Props) {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ width: '100%', maxWidth: 975, height: '100%' }}>
                <div style={{ width: '100%', height: '100%', marginTop: 40 }}>
                    {children}
                </div>
            </div>
        </div>
    )
}