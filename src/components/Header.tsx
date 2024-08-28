'use client'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LanguageIcon from '@mui/icons-material/Language';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Paper, MenuList } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, MouseEvent, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header() {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data: session } = useSession();
    const isMenuOpen = Boolean(anchorEl);


    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
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
                    <MenuItem onClick={handleMenuClose}>
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
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    '.MuiAvatar-root, .MuiTypography-root': {
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        transition: 'color 0.3s ease',
                                    }
                                },
                                transition: 'background-color 0.3s ease',
                            }}
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
    );
}
