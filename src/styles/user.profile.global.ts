export const profileMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        '.MuiAvatar-root, .MuiTypography-root': {
            color: 'rgba(0, 0, 0, 0.7)',
            transition: 'color 0.3s ease',
        }
    },
    transition: 'background-color 0.3s ease',
};

export const resetFormat = {
    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
    html: { height: '100%' },
    body: { height: '100%', margin: 0, padding: 0 }
}

export const profileDialoge = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    display: 'flex',
    borderRadius: '8px',
};

export const changedButtonStyle = {
    backgroundColor: '#a5d6a7',
    color: '#2e7d32',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#81c784',
    },
    width: '100%',
    borderRadius: '8px',
}

export const imageSmallSize = {
    width: 240,
    height: 240,
    border: '2px solid #e0e0e0',
}

export const deletedButtonStyle = {
    color: '#ef9a9a',
    borderColor: '#e57373',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#ffebee',
        borderColor: '#ef5350',
        color: '#d32f2f',
    },
    width: '100%',
    borderRadius: '8px',
}


export const styleAccountTabProfile = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
};

export const styleFormUser = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    maxWidth: 'calc(100% - 20px)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3,
    borderRadius: '8px',
};

export const HeaderButton = {
    color: '#6f42c1',
    borderColor: '#6f42c1',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    '&:hover': {
        borderColor: '#5a32a3',
        color: '#5a32a3',
    },
}

export const flexBoxSpaceBetween =
{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2
}

export const flexBoxSpaceBetweenWidthFull = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'
}

export const scrollBarStyle = { height: '100%', overflowY: 'auto' }

export const absoluteWhiteBackground = {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff'
}

export const boxSplitter = {
    padding: 3,
    marginTop: 4,
    marginRight: 4,
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
}

export const flexGap = { display: 'flex', gap: 1 }

export const flexSpaceBetween = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }

export const flexEnd = { display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }

export const mb16 = { marginBottom: '16px' }

export const mr8 = { marginRight: '8px' }

export const height100 = { height: '100%' }

export const height100vh = { height: '100vh' }

export const dashboard = {
    padding: 2.5,
    height: "100vh",
    overflowY: "auto",
    marginTop: '0.5rem'
}

export const weightWithMargin = { fontWeight: 'bold', marginBottom: 2 }

export const height400WithScroll = { height: 400, overflowY: 'auto' }

export const cardDashboard = {
    backgroundColor: '#F9FAFB',
    color: '#333',
    height: '100%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease',
    border: '1px solid #E0E0E0',
    '&:hover': {
        transform: 'translateY(-8px)',
    },
}

export const cardIcon = {
    backgroundColor: 'rgba(115, 103, 240, 0.1)',
    borderRadius: '50%',
    padding: 1,
    marginRight: 2,
}

export const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
}

export const modalBodyStyle = {
    width: '90%',
    maxHeight: '85vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: 'auto',
    padding: '16px'
}

export const borderBottom = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    paddingBottom: '4px',
    marginBottom: '16px'
}

export const boxReview = {
    mb: 2,
    p: 2,
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        transform: 'scale(1.02)',
    },
}

export const commentBoxAnimation = {
    display: 'flex',
    marginBottom: '16px',
    alignItems: 'flex-start',
    animation: 'fadeIn 0.5s ease-out',
    '@keyframes fadeIn': {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
    },
}

export const maxHeight400WithScroll = { maxHeight: '400px', height: '300px', overflowY: 'auto' }

export const centerFlex = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }

export const grayTextRightAlign = { marginTop: '0.5rem', color: 'gray', textAlign: 'right', display: 'block' }

export const commentBox = {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
}

export const maxWidth80WithShadow = {
    maxWidth: '80%',
    borderRadius: '16px',
    padding: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
}

export const avatarStyle = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginRight: '8px'
}

export const maxHeight85vhWithScroll = { maxHeight: '85vh', overflowY: 'auto', paddingRight: '16px' }

export const borderBottomStyleWithMargin = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    paddingBottom: '4px',
    marginBottom: '16px'
}

export const listItemStyle = {
    cursor: 'pointer',
    transition: 'background-color 0.5s',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
}

export const checboxReUsed = {
    width: '100%',
    '&:hover': {
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
    },
}

export const BoxReused = {
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
}

export const BoxProjectReview = {
    backgroundColor: 'white',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
}

export const projectOptionReview = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
}

export const positionAbsoluteWithCenter = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
}

//{ width: '90%', height: '80%', margin: 'auto', marginTop: '5%', backgroundColor: 'white', padding: 4, borderRadius: 2, overflowY: 'auto' }
export const modalBoxStyleWithBorder = {
    width: '90%',
    height: '80%',
    margin: 'auto',
    marginTop: '5%',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 2,
    overflowY: 'auto',
}