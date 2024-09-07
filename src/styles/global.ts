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
    p: 4,
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

export const userHeaderButton = {
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