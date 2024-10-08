'use client'
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { DataGrid } from '@mui/x-data-grid';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

import { columns as OpportunityColumn } from '@/app/(locale)/(user)/opportunity/_table_config/opportunity-table-columns';
import { columns as ProjectColumn } from '@/app/(locale)/(user)/project/_table_config/project-table-columns';

// Register required Chart.js components
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface IProps {
    dashboardTotal: any;
    opportunityStatus: any;
    projectStatus: any;
    templateStatus: any;
    opportunities: any;
    projects: any;
}



const DashboardCombined = (props: IProps) => {
    const { dashboardTotal, opportunityStatus, projectStatus, templateStatus, opportunities, projects } = props;

    const columnsToExclude = new Set(['description', '_id', 'createdAt', 'deadline', 'actions', 'category']);
    const filteredColumns = ProjectColumn.filter((column) => !columnsToExclude.has(column.field));

    const columnsToExcludeOpp = new Set(['description', '_id', 'status', 'createdAt', 'division', 'actions', 'version', 'category', 'nation', 'budget', 'timeline', 'department']);
    const filteredColumnsOpp = OpportunityColumn.filter((column) => !columnsToExcludeOpp.has(column.field));


    const statCards = [
        {
            title: 'Total Users',
            value: dashboardTotal?.totalCounts?.totalUsers || 0,
            change: dashboardTotal?.changes?.usersChange || 0,
            positive: (dashboardTotal?.changes?.usersChange || 0) >= 0,
            icon: <PeopleIcon />,
        },
        {
            title: 'Total Opportunities',
            value: dashboardTotal?.totalCounts?.totalOpportunities || 0,
            change: dashboardTotal?.changes?.opportunitiesChange || 0,
            positive: (dashboardTotal?.changes?.opportunitiesChange || 0) >= 0,
            icon: <TrendingUpIcon />,
        },
        {
            title: 'Total Projects',
            value: dashboardTotal?.totalCounts?.totalProjects || 0,
            change: dashboardTotal?.changes?.projectsChange || 0,
            positive: (dashboardTotal?.changes?.projectsChange || 0) >= 0,
            icon: <WorkIcon />,
        },
        {
            title: 'Total Templates',
            value: dashboardTotal?.totalCounts?.totalTemplates || 0,
            change: dashboardTotal?.changes?.templatesChange || 0,
            positive: (dashboardTotal?.changes?.templatesChange || 0) >= 0,
            icon: <FileCopyIcon />,
        },
    ];

    return (
        <Grid container spacing={3} sx={{ padding: 3, height: "100vh", overflowY: "auto" }}>
            {statCards.map((card) => (
                <Grid item xs={12} md={6} lg={5} key={card.title}>
                    <Card
                        sx={{
                            backgroundColor: '#F9FAFB',
                            color: '#333',
                            height: '100%',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            borderRadius: '12px',
                            transition: 'transform 0.3s ease',
                            border: '1px solid #E0E0E0',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                            },
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                    sx={{
                                        backgroundColor: 'rgba(115, 103, 240, 0.1)',
                                        borderRadius: '50%',
                                        p: 1,
                                        mr: 2,
                                    }}
                                >
                                    {card.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {card.title}
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {card.value.toLocaleString()}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: card.positive ? 'green' : 'red',
                                    fontWeight: 'bold',
                                }}
                            >
                                {card.positive ? '+' : '-'}
                                {Math.abs(card.change)}%{' '}
                                {card.positive ? 'more' : 'less'} than previous week
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Opportunity Summary
                        </Typography>
                        <Doughnut data={opportunityStatus} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3.5}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Project Summary
                        </Typography>
                        <Bar data={projectStatus} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={3.5}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Template Summary
                        </Typography>
                        <Bar data={templateStatus} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={5}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Opportunity Detail
                        </Typography>
                        <Box sx={{ height: 300, overflowY: 'auto' }}>
                            <DataGrid
                                rows={opportunities}
                                columns={filteredColumnsOpp}
                                pageSizeOptions={[5, 10]}
                                disableRowSelectionOnClick
                                pagination
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={5}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Project Detail
                        </Typography>
                        <Box sx={{ height: 300, overflowY: 'auto' }}>
                            <DataGrid
                                rows={projects}
                                columns={filteredColumns}
                                pageSizeOptions={[5, 10]}
                                disableRowSelectionOnClick
                                pagination
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardCombined;