
const style_div_main_create_post = {
    marginTop: 10,
    height: 123, width: 600,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    border: '0.5px solid grey',
}
const style_button_ui_create_post = {
    fontWeight: 600,
    width: '33%',
    maxWidth: 186,
    minWidth: 90,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centers text and icon horizontally
    cursor: 'pointer',
    fontSize: '16px', // Slightly smaller font size for better alignment
    padding: '6px 10px', // Added padding for better spacing
    borderRadius: '10px',
}
const style_button_share_ui_create_post = {
    height: 40,
    marginLeft: '10px',
    border: 'none',
    borderRadius: 20,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    transition: 'background-color 0.3s ease',
}

const flex_justifyContent_spaceBetween_center = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}

const style_input = {
    marginLeft: 10,
    height: 40,
    width: '100%',
    fontSize: '15px',
    paddingLeft: 20,
    borderRadius: 20,
    border: '1px solid grey',
}

const style_image = {
    height: 40, width: 40, borderRadius: '50%', border: '0.5px solid grey'
}

export {
    style_button_share_ui_create_post,
    style_button_ui_create_post,
    style_div_main_create_post,
    style_input,
    flex_justifyContent_spaceBetween_center,
    style_image
}