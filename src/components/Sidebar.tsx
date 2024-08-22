'use client';
import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import { useSidebar } from '@/context/SidebarContext';

const drawerWidth = 260;
const miniDrawerWidth = 60;

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
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
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