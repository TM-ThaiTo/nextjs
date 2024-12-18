export const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: 'auto',
    maxWidth: 1150,


    height: 'auto',
    maxHeight: 853,

    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 24,
    borderRadius: '15px',
};

const commonStyles = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px'
};
const titleStyle = {
    fontWeight: 800,
    fontSize: 17,
    textAlign: 'center' as const,
    flex: 1
};
const actionButtonStyle = {
    fontWeight: 800,
    fontSize: 15,
    color: '#5caff5'
};

const edit_boxEdit = ({
    position: 'absolute', // Position EditVideoPost over the video
    top: 0,
    right: 0,
    width: 360,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column', // Align everything vertically
    alignItems: 'flex-start', // Align the items at the top
    zIndex: 2,
    borderLeft: '1px solid black',
    padding: '10px'
})

const edit_thumbnailsEdit = ({
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    maxWidth: 350,
    height: 85,
    overflowX: 'auto',
    overflowY: 'hidden',
    borderRadius: '5px',
    scrollbarWidth: 'thin',
    top: 0,
    '&::-webkit-scrollbar': {
        height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
    },
})

const edit_imgThumbnails = ({
    width: 70,
    height: 70,
    borderRadius: '5px',
    cursor: 'pointer',
})

const edit_addImage = ({
    width: '100%',
    height: '150px',
    borderRadius: '10px',
    top: 0,
    objectFit: 'cover',
})

const edit_buttonSelectFromComputer = ({
    color: '#0095f6',
    fontWeight: '800',
    cursor: 'pointer',
    '&:hover': { color: 'white' },
})

const edit_trimVideo = ({
    width: '100%',
})

const edit_boxAction = ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
})

const edit_titleAction = ({
    color: 'white',
    fontWeight: 800,
    fontSize: 17,
})

const cropStyleMedia = ({
    height: '100%',
    width: 'auto',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px'
})
const cropDeleteButton = ({
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,
    color: 'red',
    borderRadius: '50%',
    fontSize: 30,
})
const cropImageCreatePost = ({
    width: '100%',
    maxWidth: 900,
    height: '100%',
    maxHeight: 750,
    objectFit: 'contain',
})
const cropVideoCreatePost = ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
})
const flexCenterCenter = ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})
const styleIconCreatePost = ({
    backgroundColor: 'gray',
    width: 32,
    height: 32,
    borderRadius: '50%'
})
const cropPopupFileMedia = ({
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 9999,
    width: 'auto',
    height: 100,
    backgroundColor: 'none',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
})

const cropPopupFileMedia_buttonDelete = ({
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
    backgroundColor: 'black',
    zIndex: 1,
    width: 20,
    height: 20,
})

const cropMenu = {
    borderRadius: 2,  // Rounded corners
    width: 170,  // Adjust width
    '& .MuiPaper-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Ensure the paper background is transparent/dark
    },
};

const cropMenuSize_item = {
    height: 50,  // Match the height of each item
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',  // White text color
    padding: '10px 20px',  // Padding inside each item
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Subtle hover effect
    },
};

const sliderZoom_Box = ({
    position: 'absolute',
    bottom: '60px',
    left: '80px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '10px',
    borderRadius: '10px',
    height: 50,
})

const sliderZoom = ({
    width: 100,
    margin: '0 5px',
    color: 'white',
    '& .MuiSlider-thumb': { backgroundColor: 'white' },
    '& .MuiSlider-track': { backgroundColor: 'white' },
    '& .MuiSlider-rail': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
})

export {
    commonStyles, titleStyle, actionButtonStyle,
    edit_imgThumbnails, edit_boxEdit, edit_thumbnailsEdit, edit_addImage, edit_buttonSelectFromComputer, edit_boxAction, edit_titleAction, edit_trimVideo,
    cropDeleteButton, cropStyleMedia, cropImageCreatePost, cropVideoCreatePost, flexCenterCenter, styleIconCreatePost,
    cropPopupFileMedia, cropPopupFileMedia_buttonDelete,
    cropMenuSize_item, cropMenu,
    sliderZoom_Box, sliderZoom
}