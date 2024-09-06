'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountProfileInfo from './user-profile-account-tab';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserMaster } from '@/types';
import { getUser } from '@/services';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    display: 'flex',
    borderRadius: '8px',
};


const UserProfileModal = (props: IProps) => {
    const { open, setOpen } = props;
    const [selectedSection, setSelectedSection] = useState('My Account');
    const [user, setUser] = useState<UserMaster | null>(null);
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            const fetchUserData = async () => {
                const session = await getSession();
                try {
                    const response = await getUser(session?.user.id);
                    setUser(response.result);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [open, router]);

    const renderContent = () => {
        switch (selectedSection) {
            case 'My Account':
                return user ? <AccountProfileInfo user={user} /> : <Typography>Loading...</Typography>;
            case 'Change Password':
                return <Typography>Change Password section</Typography>;
            case 'Notifications':
                return <Typography>Notifications section</Typography>;
            default:
                return null;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-profile"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                {/* Sidebar */}
                <Box sx={{ width: '25%', borderRight: '1px solid #ddd' }}>
                    <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>Profile</Typography>
                    <Divider />
                    <List>
                        <ListItem
                            onClick={() => setSelectedSection('My Account')}
                            selected={selectedSection === 'My Account'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'My Account' ? '#f0f0f0' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Change Password')}
                            selected={selectedSection === 'Change Password'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Change Password' ? '#f0f0f0' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><LockIcon /></ListItemIcon>
                            <ListItemText primary="Change Password" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Notifications')}
                            selected={selectedSection === 'Notifications'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Notifications' ? '#f0f0f0' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><NotificationsIcon /></ListItemIcon>
                            <ListItemText primary="Notifications" />
                        </ListItem>
                    </List>
                </Box>

                {/* Main content */}
                <Box sx={{ width: '75%', padding: 3 }}>
                    {renderContent()}
                </Box>
            </Box>
        </Modal>
    );
}

export default UserProfileModal;
