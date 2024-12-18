const style_main = {
    display: 'flex',
    width: '100%',
    maxWidth: 1000,
    height: '100%',
    maxHeight: '95vh',
}

const style_box_video = {
    width: '100%',
    maxWidth: 550,
    height: '100%',
    maxHeight: '95vh',
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: '#000',
}

const style_action_mute_pause = {
    position: 'absolute',
    top: 16,
    left: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    padding: '8px 12px',
    borderRadius: 4,
    backgroundColor: 'none',
}

const style_action_like_comment = {
    ml: '10px',
    height: '100%',
    maxHeight: '95vh',
    width: 60,
    backgroundColor: 'none',
    borderRadius: '0 5px 5px 0',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
}

const style_author_reel = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '8px 16px',
    backgroundColor: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
}
export {
    style_action_like_comment,
    style_action_mute_pause,
    style_box_video,
    style_main,
    style_author_reel
}