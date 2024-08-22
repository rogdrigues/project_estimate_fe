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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LanguageIcon from '@mui/icons-material/Language';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';
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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: "center" }}>
                                <Avatar alt="User Avatar" src="/images/user-avatar.jpg" sx={{ width: 40, height: 40 }} />
                                <IconButton size="small" color="inherit" onClick={handleProfileMenuOpen}>
                                    <ArrowDropDownIcon sx={{ color: "#000000" }} />
                                </IconButton>
                            </Box>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="body1" sx={{ color: '#000', fontWeight: 'bold' }}>
                                    Alina Mcloud
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6E6B7B' }}>
                                    VP People Manager
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
