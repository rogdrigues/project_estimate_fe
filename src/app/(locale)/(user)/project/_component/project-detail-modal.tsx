'use client'
import React, { useState } from 'react';
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
import { profileDialoge } from '@/styles';
import ProjectGeneralInfo from './tabs/project-general-information';
import ProjectAssumptions from './tabs/assumptions/project-assumptions';
import ProjectTechnologies from './tabs/technologies/project-technologies';
import ProjectProductivities from './tabs/productivities/project-productivities';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: Project | null;
}

const ProjectDetailModal = (props: IProps) => {
    const { open, setOpen, project } = props;
    const [selectedSection, setSelectedSection] = useState('General Information');

    const handleClose = () => {
        setOpen(false);
    };

    const renderContent = () => {
        switch (selectedSection) {
            case 'General Information':
                return <ProjectGeneralInfo project={project} />;
            case 'Assumptions':
                return <ProjectAssumptions projectId={project?._id} />;
            case 'Technologies':
                return <ProjectTechnologies projectId={project?._id} />;
            case 'Productivity':
                return <ProjectProductivities projectId={project?._id} />;
            case 'Resources':
            // return <Resources projectId={project?._id} />;
            case 'Checklists':
            //return <Checklists projectId={project?._id} />;
            case 'Template':
            //return <Template projectId={project?._id} />;
            case 'Reviews':
            //return <Reviews projectId={project?._id} />;
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
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'General Information' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary="General Information" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Assumptions')}
                            selected={selectedSection === 'Assumptions'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Assumptions' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><AssignmentIcon /></ListItemIcon>
                            <ListItemText primary="Assumptions" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Technologies')}
                            selected={selectedSection === 'Technologies'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Technologies' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><BuildIcon /></ListItemIcon>
                            <ListItemText primary="Technologies" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Productivity')}
                            selected={selectedSection === 'Productivity'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Productivity' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><AssessmentIcon /></ListItemIcon>
                            <ListItemText primary="Productivity" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Resources')}
                            selected={selectedSection === 'Resources'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Resources' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Resources" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Checklists')}
                            selected={selectedSection === 'Checklists'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Checklists' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><ChecklistIcon /></ListItemIcon>
                            <ListItemText primary="Checklists" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Template')}
                            selected={selectedSection === 'Template'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Template' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
                            <ListItemText primary="Template" />
                        </ListItem>
                        <ListItem
                            onClick={() => setSelectedSection('Reviews')}
                            selected={selectedSection === 'Reviews'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSection === 'Reviews' ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.5s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
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
