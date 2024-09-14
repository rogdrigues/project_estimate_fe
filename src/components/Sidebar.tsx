'use client';
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CategoryIcon from '@mui/icons-material/Category';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';

const drawerWidth = 260;
const miniDrawerWidth = 60;

const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { name: 'Division', icon: <BusinessIcon />, path: '/division' },
    { name: 'Department', icon: <ApartmentIcon />, path: '/department' },
    { name: 'User', icon: <PeopleIcon />, path: '/user' },
    { name: 'Category', icon: <CategoryIcon />, path: '/category' },
    { name: 'Project', icon: <WorkIcon />, path: '/projects' },
    { name: 'Assumption', icon: <AssignmentIcon />, path: '/assumption' },
    { name: 'Checklist', icon: <CheckBoxIcon />, path: '/checklist' },
    { name: 'Technology', icon: <DevicesIcon />, path: '/technology' },
    { name: 'Resource', icon: <StorageIcon />, path: '/resource' },
    { name: 'Productivity', icon: <ShowChartIcon />, path: '/productivity' },
    { name: 'Template', icon: <FileCopyIcon />, path: '/template' },
];


const Sidebar = () => {
    const { isSidebarOpen } = useSidebar();

    return (
        <Drawer
            sx={{
                width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                '& .MuiDrawer-paper': {
                    transition: 'width 0.3s ease',
                    overflowX: 'hidden',
                    width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
                    boxSizing: 'border-box',
                    marginTop: '65px',
                    height: 'calc(100% - 65px)',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.name} passHref legacyBehavior>
                        <ListItem button component="a">
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
