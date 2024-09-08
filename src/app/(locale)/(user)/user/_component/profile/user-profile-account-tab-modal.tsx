'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { Modal, Box, Avatar, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { changedButtonStyle, deletedButtonStyle, imageSmallSize, styleAccountTabProfile } from '@/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useToast } from '@/context/ToastContext';
import { updateUserProfile } from '@/services';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface IProps {
    open: boolean;
    handleClose: () => void;
}

const heightDefault = 570;
const widthDefault = 400;

export const AvatarModal = (props: IProps) => {
    const { open, handleClose } = props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [modalHeight, setModalHeight] = useState(heightDefault);
    const [modalWidth, setModalWidth] = useState(widthDefault);
    const router = useRouter();
    const { data: session, update } = useSession();
    const { triggerToast } = useToast();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setPreviewMode(true);
                setModalHeight(370);
                setModalWidth(400);
            }, 2000);
        }
    };

    const handleSaveAvatar = async () => {
        if (selectedFile) {
            try {
                const response: any = await updateUserProfile({ avatar: selectedFile });
                if (response.EC === 0) {
                    await update({ avatar: response.data.result.avatar });
                    triggerToast("Update avatar successfully", true);
                } else {
                    triggerToast("Update avatar failed", false);
                }
                handleClose();
            } catch (error) {
                triggerToast("Update avatar failed", false);
            }
        }
    };


    const handleCancel = () => {
        setPreviewMode(false);
        setSelectedFile(null);
        setModalHeight(heightDefault);
        setModalWidth(widthDefault);
        handleClose();
    };

    const handleBack = () => {
        setPreviewMode(false);
        setModalHeight(heightDefault);
        setModalWidth(widthDefault);
    };

    useEffect(() => {
        if (previewMode) {
            setModalHeight(370);
            setModalWidth(400);
        } else {
            setModalHeight(heightDefault);
            setModalWidth(widthDefault);
        }
    }, [previewMode]);

    return (
        <Modal open={open} onClose={handleCancel} aria-labelledby="avatar-modal-title" aria-describedby="avatar-modal-description">
            <Box
                sx={{
                    ...styleAccountTabProfile,
                    height: modalHeight,
                    width: modalWidth,
                    transition: 'height 0.3s ease, width 0.3s ease',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', mb: 2 }}>
                    {previewMode ? (
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    )}

                    <Typography id="avatar-modal-title" variant="h6" component="h2" sx={{ flex: 1, textAlign: 'center' }}>
                        Profile Picture
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                {!previewMode && (
                    <>
                        <Typography id="avatar-modal-description" variant="h6" component="h2" sx={{ mt: 2, width: '100%' }}>
                            Profile Picture
                        </Typography>
                        <Typography id="avatar-modal-description" sx={{ mt: 2, width: '100%' }}>
                            Your profile picture helps others recognize you and confirms your login.
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3, mb: 3, height: "240px" }}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Avatar
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : session?.user.profile?.avatar || undefined}
                                    alt="Profile Picture"
                                    sx={imageSmallSize}
                                />
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%', paddingBottom: '0.5rem', gap: '1rem' }}>
                            <Button
                                variant="contained"
                                component="label"
                                sx={changedButtonStyle}
                            >
                                Change
                                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={deletedButtonStyle}
                            >
                                Delete
                            </Button>
                        </Box>
                    </>
                )}

                {previewMode && (
                    <>
                        <Typography id="avatar-modal-description" sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
                            Confirm your new profile picture
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                            <Avatar
                                src={selectedFile ? URL.createObjectURL(selectedFile) : session?.user.profile?.avatar || undefined}
                                alt="Profile Picture"
                                sx={{ width: 150, height: 150, border: '2px solid #e0e0e0' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, width: "100%" }}>
                            <Button
                                variant="contained"
                                sx={changedButtonStyle}
                                onClick={handleSaveAvatar}
                            >
                                Save
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};
