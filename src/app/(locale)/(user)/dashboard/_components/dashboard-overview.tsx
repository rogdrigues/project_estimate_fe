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

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const statCards = [
    {
        title: 'Total Users',
        value: 10928,
        change: 12,
        positive: true,
        icon: <PeopleIcon />,
    },
    {
        title: 'Total Opportunities',
        value: 734,
        change: -4,
        positive: false,
        icon: <TrendingUpIcon />,
    },
    {
        title: 'Total Projects',
        value: 623,
        change: 8,
        positive: true,
        icon: <WorkIcon />,
    },
    {
        title: 'Total Templates',
        value: 542,
        change: 5,
        positive: true,
        icon: <FileCopyIcon />,
    },
];

const opportunitySummaryData = {
    labels: ['Unassigned', 'Assigned', 'In-Progress', 'Passed', 'Failed'],
    datasets: [
        {
            data: [50, 25, 15, 5, 5],
            backgroundColor: ['#808080', '#3E95CD', '#8E5EA2', '#3CBA9F', '#FF0000'],
        },
    ],
};

const projectSummaryData = {
    labels: ['In-Progress', 'Passed', 'Failed'],
    datasets: [
        {
            label: 'Projects',
            data: [1, 0, 0],
            backgroundColor: ['#3E95CD', '#3CBA9F', '#FF0000'],
        },
    ],
};

const templateSummaryData = {
    labels: ['Draft', 'Approved', 'Rejected'],
    datasets: [
        {
            label: 'Templates',
            data: [3, 5, 2],
            backgroundColor: ['#FFC107', '#4CAF50', '#F44336'],
        },
    ],
};

const opportunityColumns = [
    { field: 'opportunityName', headerName: 'Opp Name', width: 150 },
    { field: 'leaderName', headerName: 'Leader Name', width: 150 },
    { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'market', headerName: 'Market', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 },
];

const projectColumns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'opportunityName', headerName: 'Opportunity Name', width: 150 },
    { field: 'leader', headerName: 'Leader', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'subcategory', headerName: 'Subcategory', width: 150 },
    { field: 'deadline', headerName: 'Deadline', width: 150 },
];

const opportunityRows = [
    { id: 1, opportunityName: 'Migration Java', leaderName: '#N/A', customerName: 'Migration Inc', market: 'Korea', status: 'Unassigned' },
    { id: 2, opportunityName: 'new Op', leaderName: 'quanlm', customerName: 'haha', market: 'Viet Nam', status: 'In-Progress' },
];

const projectRows = [
    { id: 1, name: 'project1', opportunityName: 'new Op', leader: 'quanlm', category: 'Software Development', subcategory: 'Projects related to the development...', deadline: '#N/A' },
];

const DashboardCombined = () => {
    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            {statCards.map((card) => (
                <Grid item xs={12} md={6} lg={6} key={card.title}>
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

            {/* Opportunity Summary */}
            <Grid item xs={12} md={4} lg={4}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Opportunity Summary
                        </Typography>
                        <Doughnut data={opportunitySummaryData} />
                    </CardContent>
                </Card>
            </Grid>

            {/* Project Summary */}
            <Grid item xs={12} md={4} lg={4}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Project Summary
                        </Typography>
                        <Bar data={projectSummaryData} />
                    </CardContent>
                </Card>
            </Grid>

            {/* Template Summary */}
            <Grid item xs={12} md={4} lg={4}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Template Summary
                        </Typography>
                        <Bar data={templateSummaryData} />
                    </CardContent>
                </Card>
            </Grid>

            {/* Opportunity Detail */}
            <Grid item xs={12} md={6} lg={6}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Opportunity Detail
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                rows={opportunityRows}
                                columns={opportunityColumns}
                                pageSizeOptions={[5, 10]}
                                disableRowSelectionOnClick
                                pagination
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Project Detail */}
            <Grid item xs={12} md={6} lg={6}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Project Detail
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                rows={projectRows}
                                columns={projectColumns}
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