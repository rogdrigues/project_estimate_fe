'use client'
import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { UserMaster } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';

interface IProps {
    user: UserMaster;
}

const AccountProfileInfo = (props: IProps) => {
    const { user } = props;

    return (
        <Box sx={{ padding: 3, margin: 'auto', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Basic Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Other users of your services may be able to see some of your information.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="body2">Profile Picture</Typography>
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                        Your profile picture helps create a personal touch for your account.
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        src={user?.profile?.avatar || ''}
                        alt={user?.profile?.fullName}
                        sx={{ width: 80, height: 80, border: '2px solid #e0e0e0' }}
                    />
                    <IconButton
                        sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff' }}
                    >
                        <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="body2">Full Name</Typography>
                    <Typography variant="body1">{user?.profile?.fullName || 'No name provided'}</Typography>
                </Box>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="body2">Date of Birth</Typography>
                    <Typography variant="body1">
                        {user?.profile?.dateOfBirth
                            ? new Date(user?.profile?.dateOfBirth).toLocaleDateString()
                            : 'Not updated'}
                    </Typography>
                </Box>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="body2">Gender</Typography>
                    <Typography variant="body1">
                        {user?.profile?.gender || 'Not updated'}
                    </Typography>
                </Box>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default AccountProfileInfo;
