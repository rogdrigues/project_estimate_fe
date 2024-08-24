'use client';
import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
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

const drawerWidth = 260;
const miniDrawerWidth = 60;

const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Division', icon: <BusinessIcon /> },
    { name: 'Department', icon: <ApartmentIcon /> },
    { name: 'User', icon: <PeopleIcon /> },
    { name: 'Project', icon: <WorkIcon /> },
    { name: 'Assumption', icon: <AssignmentIcon /> },
    { name: 'Checklist', icon: <CheckBoxIcon /> },
    { name: 'Technology', icon: <DevicesIcon /> },
    { name: 'Resource', icon: <StorageIcon /> },
    { name: 'Template', icon: <FileCopyIcon /> },
    { name: 'Category', icon: <CategoryIcon /> },
    { name: 'Productivity', icon: <ShowChartIcon /> },
];

const Sidebar = () => {
    const { isSidebarOpen } = useSidebar();

    return (
        <Drawer
            sx={{
                width: isSidebarOpen ? 260 : 60,
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
                {menuItems.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default Sidebar;
