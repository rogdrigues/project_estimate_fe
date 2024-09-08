'use client'

import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material';
import { UserMaster } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import { AvatarModal } from './user-profile-account-tab-modal';
import { updateUserProfile } from '@/services/user';
import { absoluteWhiteBackground, boxSplitter, flexBoxSpaceBetween, scrollBarStyle } from '@/styles';
import EditableField from './user-profile-editable-field';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { useSession } from 'next-auth/react';

interface IProps {
    user: UserMaster;
}

const AccountProfileInfo = (props: IProps) => {
    const { user } = props;
    const { triggerToast } = useToast();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const [editMode, setEditMode] = useState<any>({
        fullName: false,
        phoneNumber: false,
        location: false,
        dateOfBirth: false,
        gender: false,
    });

    const [profileData, setProfileData] = useState<{
        [key: string]: any;
    }>({
        fullName: user?.profile?.fullName || '',
        phoneNumber: user?.profile?.phoneNumber || '',
        location: user?.profile?.location || '',
        dateOfBirth: user?.profile?.dateOfBirth || '',
        gender: user?.profile?.gender || '',
    });

    const [originalData] = useState(profileData);

    // Handle saving data to backend
    const handleSave = async (field: string) => {
        try {
            const response: any = await updateUserProfile(profileData);
            if (response.EC === 0) {
                triggerToast('Profile updated successfully', true);
            } else {
                triggerToast('An error occurred while updating profile', false);
            }
            router.refresh();
            setEditMode((prev: any) => ({ ...prev, [field]: false }));
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    const handleEditClick = (field: string) => {
        setEditMode((prev: any) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
        console.log('profileData', profileData);
    };

    const handleCancelEdit = (field: string) => {
        setProfileData((prev) => ({ ...prev, [field]: originalData[field as keyof typeof originalData] }));
        setEditMode((prev: any) => ({ ...prev, [field]: false }));
    };

    return (
        <>
            <Box sx={scrollBarStyle}>
                {/* Basic Information */}
                <Box sx={boxSplitter}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Basic Information
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Other users of your services may be able to see some of your information.
                    </Typography>

                    {/* Avatar */}
                    <Box sx={flexBoxSpaceBetween}>
                        <Box>
                            <Typography variant="body2">Profile Picture</Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                                Your profile picture helps create a personal touch for your account.
                            </Typography>
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={session?.user.profile?.avatar || undefined}
                                alt={session?.user.username}
                                sx={{ width: 80, height: 80, border: '2px solid #e0e0e0' }}
                            />
                            <IconButton sx={absoluteWhiteBackground} onClick={() => setOpen(true)}>
                                <EditIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Email */}
                    <Box sx={flexBoxSpaceBetween}>
                        <Box>
                            <Typography variant="body2">Email</Typography>
                            <Typography variant="body1">{user?.email || 'No email provided'}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Full Name */}
                    <EditableField
                        label="Full Name"
                        value={profileData.fullName}
                        isEditing={editMode.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        onEdit={() => handleEditClick('fullName')}
                        onSave={() => handleSave('fullName')}
                        onCancel={() => handleCancelEdit('fullName')}
                    />

                    <Divider sx={{ mb: 2 }} />

                    {/* Date of Birth */}
                    <EditableField
                        label="Date of Birth"
                        value={profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().slice(0, 10) : ''}
                        type="date"
                        isEditing={editMode.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        onEdit={() => handleEditClick('dateOfBirth')}
                        onSave={() => handleSave('dateOfBirth')}
                        onCancel={() => handleCancelEdit('dateOfBirth')}
                    />

                    <Divider sx={{ mb: 2 }} />

                    {/* Gender */}
                    <EditableField
                        label="Gender"
                        value={profileData.gender}
                        isEditing={editMode.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        onEdit={() => handleEditClick('gender')}
                        onSave={() => handleSave('gender')}
                        onCancel={() => handleCancelEdit('gender')}
                        isSelect
                        selectOptions={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                            { value: 'Other', label: 'Other' },
                        ]}
                    />

                    <Divider sx={{ mb: 2 }} />
                </Box>

                {/* Detailed Information */}
                <Box sx={boxSplitter}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Detailed Information
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Detailed information about your department and division.
                    </Typography>

                    {/* Division */}
                    <Box sx={flexBoxSpaceBetween}>
                        <Box>
                            <Typography variant="body2">Division</Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                                {user?.division?.name || 'No division assigned'}
                            </Typography>
                        </Box>
                        <Avatar
                            src={user?.division?.logo || ''}
                            alt={user?.division?.name}
                            sx={{ width: 50, height: 50, border: '2px solid #e0e0e0' }}
                        />
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Department */}
                    <Box sx={flexBoxSpaceBetween}>
                        <Box>
                            <Typography variant="body2">Department</Typography>
                            <Typography variant="caption" sx={{ color: 'gray' }}>
                                {user?.department?.name || 'No department assigned'}
                            </Typography>
                        </Box>
                        <Avatar
                            src={user?.department?.logo || ''}
                            alt={user?.department?.name}
                            sx={{ width: 50, height: 50, border: '2px solid #e0e0e0' }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Additional Information */}
                <Box sx={boxSplitter}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Additional Information
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        Other details related to your profile.
                    </Typography>

                    {/* Phone Number */}
                    <EditableField
                        label="Phone Number"
                        value={profileData.phoneNumber}
                        isEditing={editMode.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        onEdit={() => handleEditClick('phoneNumber')}
                        onSave={() => handleSave('phoneNumber')}
                        onCancel={() => handleCancelEdit('phoneNumber')}
                    />

                    <Divider sx={{ mb: 2 }} />

                    {/* Location */}
                    <EditableField
                        label="Location"
                        value={profileData.location}
                        isEditing={editMode.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        onEdit={() => handleEditClick('location')}
                        onSave={() => handleSave('location')}
                        onCancel={() => handleCancelEdit('location')}
                    />
                </Box>
                <AvatarModal open={open} handleClose={() => setOpen(false)} />
            </Box>
        </>
    );
}

export default AccountProfileInfo;
