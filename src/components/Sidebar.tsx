'use client';
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlanIcon from '@mui/icons-material/Receipt';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const drawerWidth = 260;
const miniDrawerWidth = 60;

const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', tag: ['view_dashboard'] },
    { name: 'Division', icon: <BusinessIcon />, path: '/division', tag: ['manage_division', 'view_division', 'view_division_profile'] },
    { name: 'Department', icon: <ApartmentIcon />, path: '/department', tag: ['manage_department', 'view_department', 'view_department_profile'] },
    { name: 'User', icon: <PeopleIcon />, path: '/user', tag: ['manage_users'] },
    { name: 'Category', icon: <CategoryIcon />, path: '/category', tag: ['manage_categories', 'view_categories'] },
    { name: 'Project', icon: <WorkIcon />, path: '/project', tag: ['manage_projects', 'view_projects'] },
    { name: 'Assumption', icon: <AssignmentIcon />, path: '/assumption', tag: ['manage_assumptions', 'view_assumptions'] },
    { name: 'Checklist', icon: <CheckBoxIcon />, path: '/checklist', tag: ['manage_checklists', 'view_checklists'] },
    { name: 'Technology', icon: <DevicesIcon />, path: '/technology', tag: ['manage_technology', 'view_technology'] },
    { name: 'Resource', icon: <StorageIcon />, path: '/resource', tag: ['manage_resources', 'view_resources'] },
    { name: 'Productivity', icon: <ShowChartIcon />, path: '/productivity', tag: ['manage_productivity', 'view_productivity'] },
    { name: 'Template', icon: <FileCopyIcon />, path: '/template', tag: ['manage_template', 'view_template'] },
    { name: 'Opportunity', icon: <TrendingUpIcon />, path: '/opportunity', tag: ['manage_opportunity', 'view_opportunity'] },
    { name: 'Presale Plan', icon: <PlanIcon />, path: '/presaleplan', tag: ['manage_presale_plan', 'view_presale_plan'] }
];

const Sidebar = () => {
    const { isSidebarOpen } = useSidebar();
    const { data: session } = useSession();
    const userPermissions = session?.user?.role?.permissions || [];

    const hasPermission = (tags: string[]) => tags.some(tag => userPermissions.includes(tag));

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
                    hasPermission(item.tag) && (
                        <Link href={item.path} key={item.name} passHref legacyBehavior>
                            <ListItem button component="a">
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Link>
                    )
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
