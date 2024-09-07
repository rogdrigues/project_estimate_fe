export const loginButton = {
    mt: 2,
    width: '100%',
    borderRadius: '8px',
    height: '40px',
    backgroundColor: '#7367F0',
    '&:hover': {
        backgroundColor: '#7367F0',
        boxShadow: '0 8px 25px -8px #7367F0',
    }
}

export const headerForm = {
    fontFamily: 'Montserrat, Helvetica, Arial, serif',
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: '1.5',
    color: '#FFFFFF',
    mt: 2
}

export const subtitleForm =
{
    fontSize: '14px',
    color: '#D1D1D1',
    mt: 1
}

export const logoLoginCover =
{
    height: '100%',
    backgroundImage: 'url(/images/login-159201.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

export const BoxLogin = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#283046',
    flexDirection: 'column'
}

export const formInput = {
    mt: 4,
    width: '100%',
    px: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const fieldInput = {
    mb: 2,
    borderRadius: '8px',
    backgroundColor: 'transparent',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffffff',
        },
        '&:hover fieldset': {
            borderColor: '#ffffff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
        },
    },
    input: {
        color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
        color: '#f0f0f0',
    }
}