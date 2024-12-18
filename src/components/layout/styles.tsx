const actionBoxStyle = (isDesktop: boolean, actionHoverColor?: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isDesktop ? 'flex-start' : 'center',
    width: '100%',
    height: '100%',
    padding: isDesktop ? '0.5rem 1rem' : '0.5rem',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': isDesktop ? { backgroundColor: actionHoverColor, transform: "scale(1.05)", } : { transform: 'scale(0.9)' },
});

const sidebarWrapperStyle = (isDesktop: boolean) => ({
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto',
    zIndex: 1,
    width: isDesktop ? '250px' : '80px'
});

const sidebarBoxStyle = (isDesktop: boolean) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Đảm bảo khoảng trống giữa nội dung và nút More
    height: '100vh',
    borderRight: '0.5px solid #ddd',
    padding: '1rem',
});

const mainContentStyle = (isDesktop: boolean, isTablet: boolean, isMobile?: boolean, showContacts?: boolean) => ({
    flexGrow: 1,
    marginLeft: isDesktop ? 250 : (isTablet ? 80 : 0),
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden'
});

const mobileNavBarStyle = (themeBackground: string) => ({
    zIndex: 10,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    minWidth: '320px',
    maxWidth: '100%',
    backgroundColor: themeBackground
});

const mobileNavBarInnerStyle = {
    width: '100%',
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px'
};

const mobileNavBarBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    overflowX: 'auto'
};

const buttonStyle = {
    display: 'flex',
    height: 50,
    width: '100%',
    borderRadius: '10px',
    alignItems: 'center',
    padding: '10px 15px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
};

const buttonTextStyle = {
    fontSize: '14px',
    marginLeft: '10px',
};

const iconStyle = {
};


const linkStyle = {
    textDecoration: 'none'
}
export {
    actionBoxStyle,
    sidebarWrapperStyle,
    sidebarBoxStyle,
    mainContentStyle,
    mobileNavBarStyle,
    mobileNavBarInnerStyle,
    mobileNavBarBoxStyle,
    buttonStyle,
    buttonTextStyle,
    iconStyle,
    linkStyle
};
