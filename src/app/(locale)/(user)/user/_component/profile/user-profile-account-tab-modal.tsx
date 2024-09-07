'use client'
import { useState, ChangeEvent } from 'react';
import { Modal, Box, Avatar, Button, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { changedButtonStyle, deletedButtonStyle, imageSmallSize, styleAccountTabProfile } from '@/styles';

interface IProps {
    open: boolean;
    handleClose: () => void;
    avatarUrl: string;
}


export const AvatarModal = (props: IProps) => {
    const { open, handleClose, avatarUrl } = props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="avatar-modal-title" aria-describedby="avatar-modal-description">
            <Box sx={styleAccountTabProfile}>
                <Typography id="avatar-modal-title" variant="h6" component="h2" sx={{ textAlign: 'left', width: '100%' }}>
                    Profile Picture
                </Typography>
                <Typography id="avatar-modal-description" sx={{ mt: 2, textAlign: 'left', width: '100%' }}>
                    Your profile picture helps others recognize you and confirms your login.
                </Typography>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                    <Avatar
                        src={avatarUrl || ''}
                        alt="Profile Picture"
                        sx={imageSmallSize}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<EditIcon />}
                        sx={changedButtonStyle}
                    >
                        Change
                        <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={deletedButtonStyle}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
