'use client'
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';
import { useState, MouseEvent } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Toolbar, IconButton, Badge, Avatar, Typography, Menu, MenuItem, MenuList, ListItemIcon, ListItemText, Divider, Box, Paper, InputBase } from '@mui/material';
import { Notifications as NotificationsIcon, AccountCircle, LightMode as LightModeIcon, Language as LanguageIcon, AccountBox as AccountBoxIcon, FilterFrames as FilterFramesIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { PanoramaFishEye as PanoramaFishEyeIcon, RadioButtonChecked as RadioButtonCheckedIcon } from '@mui/icons-material';
import UserProfileModal from '@/app/(locale)/(user)/user/_component/profile/user-profile-dialoge';
import { profileMenuStyle } from '@/styles';

export default function Header() {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data: session } = useSession();
    const isMenuOpen = Boolean(anchorEl);
    const [openProfile, setOpenProfile] = useState(false);

    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                mt: '10px',
                '& .MuiPaper-root': {
                    minWidth: '200px',
                },
            }}
        >
            <Paper>
                <MenuList>
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        setOpenProfile(true);
                    }}>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <FilterFramesIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Branch</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        signOut({ callbackUrl: '/auth/signin' });
                    }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Menu>
    );

    const getInitials = (fullName: string | undefined) => {
        if (!fullName) return '';
        const names = fullName.split(' ');
        const initials = names.map(name => name[0]).join('').toUpperCase();
        return initials;
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: "5rem" }}>
                            <Image src="/vercel.svg" alt="Project Estimate Logo" width={120} height={60} />
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton onClick={toggleSidebar} edge="start" color="inherit" aria-label="open drawer"
                                    sx={{ borderRadius: '50%' }}
                                >
                                    {isSidebarOpen ? <PanoramaFishEyeIcon sx={{ color: "#000" }} /> : <RadioButtonCheckedIcon sx={{ color: "#000" }} />}
                                </IconButton>
                                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                    gap: '16px',
                                }}
                            >
                                <IconButton color="inherit" sx={{ backgroundColor: '#ffebee', borderRadius: '50%' }}>
                                    <Badge color="secondary">
                                        <NotificationsIcon sx={{ color: '#f44336' }} />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit" sx={{ backgroundColor: '#e0f7fa', borderRadius: '50%' }}>
                                    <AccountCircle sx={{ color: '#00796b' }} />
                                </IconButton>
                                <IconButton color="inherit" sx={{ backgroundColor: '#f3e5f5', borderRadius: '50%' }}>
                                    <LightModeIcon sx={{ color: '#9c27b0' }} />
                                </IconButton>
                                <IconButton color="inherit" sx={{ backgroundColor: '#f3e5f5', borderRadius: '50%' }}>
                                    <LanguageIcon sx={{ color: '#9c27b0' }} />
                                </IconButton>
                            </Box>
                            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                            <Box
                                sx={profileMenuStyle}
                                onClick={handleProfileMenuOpen}
                            >
                                {session && session.user && (
                                    <>
                                        <Avatar
                                            alt={session.user.username}
                                            src={session.user.profile?.avatar || undefined}
                                        >
                                            {!session.user.profile?.avatar && getInitials(session.user.username)}
                                        </Avatar>
                                    </>
                                )}
                                <Box sx={{ textAlign: 'left', ml: 1 }}>
                                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 'bold', transition: 'color 0.3s ease' }}>
                                        {session?.user?.username}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#6E6B7B', transition: 'color 0.3s ease' }}>
                                        {session?.user?.role.roleName}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </Box>
            <UserProfileModal open={openProfile} setOpen={setOpenProfile} />
        </>
    );
}
