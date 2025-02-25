'use client';
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
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
import { usePathname } from 'next/navigation';

const drawerWidth = 260;
const miniDrawerWidth = 75;

const menuItems = [
    {
        section: 'Dashboard', items: [
            { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', tag: ['view_dashboard'] },
        ]
    },
    {
        section: 'Management', items: [
            { name: 'Division', icon: <BusinessIcon />, path: '/division', tag: ['manage_division', 'view_division', 'view_division_profile'] },
            { name: 'Department', icon: <ApartmentIcon />, path: '/department', tag: ['manage_department', 'view_department', 'view_department_profile'] },
            { name: 'User', icon: <PeopleIcon />, path: '/user', tag: ['manage_users'] },
        ]
    },
    {
        section: 'Projects', items: [
            { name: 'Project', icon: <WorkIcon />, path: '/project', tag: ['manage_projects', 'view_projects'] },
            { name: 'Project Review', icon: <WorkIcon />, path: '/project_review', tag: ['project_review'] },
            { name: 'Category', icon: <CategoryIcon />, path: '/category', tag: ['manage_categories', 'view_categories'] },
        ]
    },
    {
        section: 'Components', items: [
            { name: 'Assumption', icon: <AssignmentIcon />, path: '/assumption', tag: ['manage_assumptions', 'view_assumptions'] },
            { name: 'Checklist', icon: <CheckBoxIcon />, path: '/checklist', tag: ['manage_checklists', 'view_checklists'] },
            { name: 'Technology', icon: <DevicesIcon />, path: '/technology', tag: ['manage_technology', 'view_technology'] },
            { name: 'Resource', icon: <StorageIcon />, path: '/resource', tag: ['manage_resources', 'view_resources'] },
            { name: 'Productivity', icon: <ShowChartIcon />, path: '/productivity', tag: ['manage_productivity', 'view_productivity'] },
        ]
    },
    {
        section: 'Documents', items: [
            { name: 'Template', icon: <FileCopyIcon />, path: '/template', tag: ['manage_template', 'view_template'] },
            { name: 'Opportunity', icon: <TrendingUpIcon />, path: '/opportunity', tag: ['manage_opportunity', 'view_opportunity'] },
            { name: 'Presale Plan', icon: <PlanIcon />, path: '/presaleplan', tag: ['manage_presale_plan', 'view_presale_plan'] }
        ]
    }
];

const Sidebar = () => {
    const { isSidebarOpen } = useSidebar();
    const { data: session } = useSession();
    const currentPath = usePathname();
    const userPermissions = session?.user?.role?.permissions || [];

    const hasPermission = (tags: string[]) => {
        return tags.some(tag => userPermissions.includes(tag));
    };

    return (
        <Drawer
            sx={{
                width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                '& .MuiDrawer-paper': {
                    transition: 'width 0.3s ease',
                    overflowY: 'auto',
                    width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
                    boxSizing: 'border-box',
                    marginTop: '65px',
                    height: 'calc(100% - 65px)',
                    paddingRight: 2,
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {menuItems.map((section) => (
                    <React.Fragment key={section.section}>
                        <Typography
                            variant="subtitle2"
                            sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 1, color: '#6c757d', fontWeight: 'bold' }}
                        >
                            {isSidebarOpen ? section.section : ""}
                        </Typography>
                        {section.items.map((item) => (
                            <Link href={hasPermission(item.tag) ? item.path : '#'} key={item.name} passHref legacyBehavior>
                                <ListItem
                                    component="a"
                                    selected={!!currentPath && currentPath.startsWith(item.path)}
                                    disabled={!hasPermission(item.tag)}
                                    sx={{
                                        borderRadius: '8px',
                                        marginX: 1,
                                        paddingRight: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(115, 103, 240, 0.15)',
                                            color: '#000',
                                            '& .MuiListItemIcon-root': {
                                                color: '#7367F0',
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: hasPermission(item.tag) ? 'rgba(115, 103, 240, 0.08)' : 'inherit',
                                            transition: 'background-color 0.3s ease',
                                        },
                                        '&.Mui-disabled': {
                                            opacity: 0.5,
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                                    {isSidebarOpen && <ListItemText primary={item.name} sx={{ color: 'black' }} />}
                                </ListItem>
                            </Link>
                        ))}
                        <Divider sx={{ marginY: 1 }} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
