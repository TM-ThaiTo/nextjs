const style_avatar_owner = {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 0,
    left: 0,
    border: '2px solid #fff',
    zIndex: 3,
}

const style_avatar_myuser = {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 20,
    left: 18,
    border: '2px solid #fff',
    zIndex: 2,
}

const style_total_member = {
    width: 32, height: 32,
    backgroundColor: '#6c757d',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    left: 32,
    zIndex: 1,
    color: '#fff',
}

const style_member = {
    width: '100%',
    height: 72,
    pl: '20px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    '&:hover': { backgroundColor: '#efefef', cursor: 'pointer' }
}
export {
    style_avatar_myuser,
    style_avatar_owner,
    style_total_member,
    style_member
}