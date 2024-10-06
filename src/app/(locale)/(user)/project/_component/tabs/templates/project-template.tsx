import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { columns } from './_table_config/project-template-table-columns';
import { Project, TemplateData } from '@/types';
import { getTemplateData } from '@/services';
import { HeaderButton } from '@/styles';

interface IProps {
    project: Project;
}

const ProjectTemplate = (props: IProps) => {
    const { project } = props;
    const [templateData, setTemplateData] = useState<TemplateData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTemplateData = async () => {
            if (!project?.template?._id || !project?._id) return;
            setLoading(true);
            try {
                const data = await getTemplateData(project._id, project.template._id);
                setTemplateData(data);
            } catch (error) {
                console.error('Failed to fetch template data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplateData();
    }, [project]);

    const handleExport = () => {
        console.log("Exporting Template File");
    };

    return (
        <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Version Information
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={HeaderButton}
                    onClick={handleExport}
                >
                    Export File Template
                </Button>
            </Box>

            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Here you can find the version details of the template.
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Template Name</Typography>
                    <Typography variant="body1">{templateData?.templateId?.name || 'No name provided'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Version Number</Typography>
                    <Typography variant="body1">{templateData?.version?.versionNumber || 'No version number provided'}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Version Date</Typography>
                    <Typography variant="body1">{templateData?.version?.versionDate ? new Date(templateData.version.versionDate).toLocaleDateString() : 'No date provided'}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body2">Created By</Typography>
                    <Typography variant="body1">{templateData?.version?.createdBy?.username || 'No creator information'}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Changes Log */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Changes Log
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                Here you can find the detailed changes log of the template.
            </Typography>

            <Box sx={{ height: 350, maxHeight: '100%', overflowY: 'auto' }}>
                <DataGrid
                    rows={templateData?.changesLog || []}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    loading={loading}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-root': {
                            overflowX: 'auto',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                        '& .MuiDataGrid-cell': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ProjectTemplate;
