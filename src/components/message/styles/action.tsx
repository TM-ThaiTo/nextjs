const styleButton = ({
    color: 'black',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '14px',
    textTransform: 'none',
});

const popoverStyle = ({
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5', // Light background for contrast
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for depth
    width: 180, // Slightly wider for better readability
});
export { styleButton, popoverStyle };