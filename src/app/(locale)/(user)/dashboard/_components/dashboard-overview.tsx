'use client'
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { DataGrid } from '@mui/x-data-grid';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

import { columns as OpportunityColumn } from '@/app/(locale)/(user)/opportunity/_table_config/opportunity-table-columns';
import { columns as ProjectColumn } from '@/app/(locale)/(user)/project/_table_config/project-table-columns';
import { cardDashboard, cardIcon, dashboard, height100, height400WithScroll, weightWithMargin } from '@/styles';

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

    const columnsToExclude = new Set(['description', '_id', 'id', 'createdAt', 'deadline', 'actions', 'category']);
    const filteredColumns = ProjectColumn.filter((column) => !columnsToExclude.has(column.field));

    const columnsToExcludeOpp = new Set(['description', '_id', 'id', 'status', 'createdAt', 'division', 'actions', 'category', 'nation', 'budget', 'timeline', 'department']);
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
        <Grid container spacing={3} sx={dashboard}>
            {statCards.map((card) => (
                <Grid item xs={12} md={6} lg={6} key={card.title}>
                    <Card sx={cardDashboard}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                    sx={cardIcon}
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
            ))
            }

            <Grid item xs={12} md={6} lg={2.5}>
                <Card sx={height100}>
                    <CardContent>
                        <Typography variant="h6" sx={weightWithMargin}>
                            Opportunity Summary
                        </Typography>
                        <Doughnut data={opportunityStatus} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4.75}>
                <Card sx={height100}>
                    <CardContent>
                        <Typography variant="h6" sx={weightWithMargin}>
                            Project Summary
                        </Typography>
                        <Bar data={projectStatus} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4.75}>
                <Card sx={height100}>
                    <CardContent>
                        <Typography variant="h6" sx={weightWithMargin}>
                            Template Summary
                        </Typography>
                        <Bar data={templateStatus} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Card sx={height100}>
                    <CardContent>
                        <Typography variant="h6" sx={weightWithMargin}>
                            Opportunity Detail
                        </Typography>
                        <Box sx={height400WithScroll}>
                            <DataGrid
                                rows={opportunities?.result || []}
                                getRowId={(row) => row._id}
                                columns={filteredColumnsOpp}
                                pageSizeOptions={[5]}
                                disableRowSelectionOnClick
                                pagination
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Card sx={height100}>
                    <CardContent>
                        <Typography variant="h6" sx={weightWithMargin}>
                            Project Detail
                        </Typography>
                        <Box sx={height400WithScroll}>
                            <DataGrid
                                rows={projects?.result || []}
                                getRowId={(row) => row._id}
                                columns={filteredColumns}
                                pageSizeOptions={[5]}
                                disableRowSelectionOnClick
                                pagination
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Box sx={{ paddingBottom: '4rem', width: '100%' }} />
        </Grid >
    );
};

export default DashboardCombined;