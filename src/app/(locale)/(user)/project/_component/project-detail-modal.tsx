'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Project } from '@/types';
import { listItemStyle, profileDialoge } from '@/styles';
import ProjectGeneralInfo from './tabs/project-general-information';
import ProjectAssumptions from './tabs/assumptions/project-assumptions';
import ProjectTechnologies from './tabs/technologies/project-technologies';
import ProjectProductivities from './tabs/productivities/project-productivities';
import ProjectChecklists from './tabs/checklists/project-checklists';
import ProjectResources from './tabs/resources/project-resources';
import ProjectReview from './tabs/project-detail-review';
import { getProjectById } from '@/services';
import ProjectTemplate from './tabs/templates/project-template';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    projectId: string;
    inReviewer?: boolean;
}

const ProjectDetailModal = (props: IProps) => {
    const { open, setOpen, projectId, inReviewer } = props;
    const [selectedSection, setSelectedSection] = useState('General Information');
    const [project, setProject] = useState<Project>();
    const handleClose = () => {
        setOpen(false);
    };

    const fetchProject = async () => {
        try {
            const fetchedProject: Project = await getProjectById(projectId);
            setProject(fetchedProject?.result);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    }

    useEffect(() => {
        if (open) {
            fetchProject();
        }
    }, [open]);

    const renderContent = () => {
        switch (selectedSection) {
            case 'General Information':
                return <ProjectGeneralInfo project={project} />;
            case 'Assumptions':
                return <ProjectAssumptions projectId={project?._id} status={project?.status} />;
            case 'Technologies':
                return <ProjectTechnologies projectId={project?._id} status={project?.status} />;
            case 'Productivity':
                return <ProjectProductivities projectId={project?._id} status={project?.status} />;
            case 'Resources':
                return <ProjectResources projectId={project?._id} status={project?.status} />;
            case 'Checklists':
                return <ProjectChecklists projectId={project?._id} status={project?.status} />;
            case 'Template':
                return <ProjectTemplate project={project} />;
            case 'Reviews':
                return <ProjectReview project={project} fetchProject={fetchProject} />;
            default:
                return <Typography>Select a section to view details</Typography>;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-project-detail"
            aria-describedby="modal-description"
        >
            <Box sx={profileDialoge}>
                <Box sx={{ width: '20%', borderRight: '1px solid #ddd' }}>
                    <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>Project Details</Typography>
                    <Divider />
                    <List>
                        <ListItem
                            onClick={() => setSelectedSection('General Information')}
                            selected={selectedSection === 'General Information'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'General Information' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary="General Information" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Assumptions')}
                            selected={selectedSection === 'Assumptions'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Assumptions' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><AssignmentIcon /></ListItemIcon>
                            <ListItemText primary="Assumptions" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Technologies')}
                            selected={selectedSection === 'Technologies'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Technologies' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><BuildIcon /></ListItemIcon>
                            <ListItemText primary="Technologies" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Productivity')}
                            selected={selectedSection === 'Productivity'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Productivity' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><AssessmentIcon /></ListItemIcon>
                            <ListItemText primary="Productivity" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Resources')}
                            selected={selectedSection === 'Resources'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Resources' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Resources" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Checklists')}
                            selected={selectedSection === 'Checklists'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Checklists' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><ChecklistIcon /></ListItemIcon>
                            <ListItemText primary="Checklists" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Template')}
                            selected={selectedSection === 'Template'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Template' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                            <ListItemText primary="Template" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Reviews')}
                            selected={selectedSection === 'Reviews'}
                            sx={{
                                ...listItemStyle,
                                backgroundColor: selectedSection === 'Reviews' ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <ListItemIcon><RateReviewIcon /></ListItemIcon>
                            <ListItemText primary="Reviews" />
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{ width: '80%', padding: 3 }}>
                    {renderContent()}
                </Box>
            </Box>
        </Modal>
    );
};

export default ProjectDetailModal;
