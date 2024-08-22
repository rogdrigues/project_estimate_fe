import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ToastProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    responseMessage: string;
    status: boolean;
}

const Toast = (props: ToastProps) => {
    const { open, setOpen, responseMessage, status } = props;

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(!open)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpen(!open)}
                    severity={status ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {responseMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toast;