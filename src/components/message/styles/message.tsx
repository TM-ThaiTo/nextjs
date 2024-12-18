const mainContentMessage = ({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 80px)',
})

const messageContent = ({
    width: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
})

const listItemMessage = ({
    width: 'auto',
    maxWidth: 600,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '10px',
})

const imageMessage = ({
    width: 200,
    height: 200,
    objectFit: 'cover',
})

const itemMessageImageBox = ({
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    mt: 1,
    cursor: 'pointer'
})

const fullImageMessage = {
    width: '100%',
    height: 'auto',
    maxWidth: '95vw',
    maxHeight: '90vh',
    objectFit: 'contain',
};

const buttonCloseDialogFullImage = ({
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
})

const videoMessage = ({
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '100%',
    height: 'auto',
})

export {
    mainContentMessage,
    messageContent,
    listItemMessage,
    imageMessage,
    itemMessageImageBox,
    fullImageMessage,
    buttonCloseDialogFullImage,
    videoMessage
};