'use client';

import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { Project } from '@/types';
import { scrollBarStyle } from '@/styles';

interface IProps {
    project: Project;
}

const ProjectGeneralInfo = (props: IProps) => {
    const { project } = props;

    return (
        <Box sx={scrollBarStyle}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                General Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Here you can find the general details of the project.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
                {/* Project Name */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Project Name</Typography>
                    <Typography variant="body1">{project?.name || 'No name provided'}</Typography>
                </Grid>

                {/* Description */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Description</Typography>
                    <Typography variant="body1">{project?.description || 'No description provided'}</Typography>
                </Grid>

                {/* Reviewer */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Reviewer</Typography>
                    <Typography variant="body1">{project?.reviewer?.username || 'No reviewer assigned'}</Typography>
                </Grid>

                {/* Lead */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Project Lead</Typography>
                    <Typography variant="body1">{project?.lead?.username || 'No lead assigned'}</Typography>
                </Grid>

                {/* Status */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Status</Typography>
                    <Typography variant="body1">{project?.status || 'No status available'}</Typography>
                </Grid>
                {/* Deadline */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Deadline</Typography>
                    <Typography variant="body1">{project?.deadline || 'No deadline provided'}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Category Information */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Category Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Here you can find the category details of the project.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
                {/* Category */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Category Name</Typography>
                    <Typography variant="body1">{project?.category?.CategoryName || 'No category assigned'}</Typography>
                </Grid>

                {/* Sub Category */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Sub Category</Typography>
                    <Typography variant="body1">{project?.category?.SubCategory || 'No category assigned'}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Opportunity Information */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Opportunity Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Here you can find the opportunity details of the project.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
                {/* Opportunity */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Opportunity</Typography>
                    <Typography variant="body1">{project?.opportunity?.name || 'No opportunity linked'}</Typography>
                </Grid>

                {/* Customer */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Customer</Typography>
                    <Typography variant="body1">{project?.opportunity?.customerName || 'No customer linked'}</Typography>
                </Grid>

                {/* Scope */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Scope</Typography>
                    <Typography variant="body1">{project?.opportunity?.scope || 'No scope provided'}</Typography>
                </Grid>

                {/* Budget */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Budget</Typography>
                    <Typography variant="body1">{project?.opportunity?.budget || 'No budget provided'}</Typography>
                </Grid>

                {/* Nation */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Nation</Typography>
                    <Typography variant="body1">{project?.opportunity?.nation || 'No nation provided'}</Typography>
                </Grid>

                {/* Money Type */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Money Type</Typography>
                    <Typography variant="body1">{project?.opportunity?.moneyType || 'No money type provided'}</Typography>
                </Grid>

                {/* Version */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Version</Typography>
                    <Typography variant="body1">{project?.opportunity?.version || 'No version provided'}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Template Information */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Template Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Here you can find the template details of the project.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
                {/* Template */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Template</Typography>
                    <Typography variant="body1">{project?.template?.name || 'No template linked'}</Typography>
                </Grid>

                {/* Description */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Description</Typography>
                    <Typography variant="body1">{project?.template?.description || 'No description provided'}</Typography>
                </Grid>

                {/* File Path */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">File Path</Typography>
                    <Typography variant="body1">{project?.template?.filePath.split('\\').pop() || 'No file path provided'}</Typography>
                </Grid>

                {/* Version */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Version</Typography>
                    <Typography variant="body1">{project?.template?.version || 'No version provided'}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProjectGeneralInfo;
