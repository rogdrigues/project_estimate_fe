'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import AccountProfileInfo from './user-profile-account-tab';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserMaster } from '@/types';
import { getUser } from '@/services';
import { profileDialoge } from '@/styles';
import LoadingComponent from '@/components/LoadingComponent';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

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
                } catch (error: any) {
                    console.error(`Error fetching user data: ${error.message}`);
                }
            };

            fetchUserData();
        }
    }, [open, router]);

    const renderContent = () => {
        switch (selectedSection) {
            case 'My Account':
                return user ? <AccountProfileInfo user={user} /> : <LoadingComponent text={"Loading user data..."} />;
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
            <Box sx={profileDialoge}>
                <Box sx={{ width: '20%', borderRight: '1px solid #ddd' }}>
                    <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>Profile</Typography>
                    <Divider />
                    <List>
                        <ListItem
                            onClick={() => setSelectedSection('My Account')}
                            selected={selectedSection === 'My Account'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'My Account' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItem>
                        <ListItem
                            disabled
                            selected={selectedSection === 'Profile'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Profile' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><LockIcon /></ListItemIcon>
                            <ListItemText primary="????????" />
                        </ListItem>
                        <ListItem
                            disabled
                            selected={selectedSection === 'Notifications'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Notifications' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><LockIcon /></ListItemIcon>
                            <ListItemText primary="????????" />
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{ width: '80%', padding: 3 }}>
                    {renderContent()}
                </Box>
            </Box>
        </Modal>
    );
}

export default UserProfileModal;
