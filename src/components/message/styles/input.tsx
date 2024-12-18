const InputImage = ({
    position: 'absolute',
    top: '-130px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    width: '100%',
    backgroundColor: 'white',
    p: 1,
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap', // Allow images to wrap if too many
})

const ButtonRemoveImage = ({
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'red',
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '2px',
})

const StyleImage = ({
    maxHeight: '100px',
    maxWidth: '100px',
    borderRadius: '5px',
    display: 'block',
})


const LayoutText = ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
})


export {
    InputImage,
    LayoutText,
    ButtonRemoveImage,
    StyleImage
};