import * as React from 'react';
import { Modal, Box, Typography, Button, Fade, IconButton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    handleConfirm: () => void;
}

const WarningModal = (props: IProps) => {
    const { open, handleClose, message, handleConfirm } = props;
    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open} timeout={500}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                    outline: 'none',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <WarningIcon sx={{ color: '#ff9800' }} /> Warning
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {message}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default WarningModal;
