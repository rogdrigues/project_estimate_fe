'use client';

import { useEffect, useState } from 'react';
import { Technology, ProjectTechnology } from '@/types';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Box, Typography, Modal, Divider } from '@mui/material';
import { updateProjectComponents } from '@/services';
import { columns } from '@/app/(locale)/(user)/technology/_table-config/technology-table-columns';
import { useToast } from '@/context/ToastContext';
import TableComponentWithCheckbox from '@/components/_table_form-config/table-checkbox-component';
import { HeaderButton } from '@/styles';

interface IProps {
    fetchSelectedTechnologies: () => void;
    projectId: string;
    technologies: Technology[];
    components: ProjectTechnology[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ProjectTechnologiesSelectedModal = (props: IProps) => {
    const { projectId, technologies, open, setOpen, components, fetchSelectedTechnologies } = props;
    const { triggerToast } = useToast();
    const [selectedTechnologies, setSelectedTechnologies] = useState<ProjectTechnology[]>([]);

    const handleSave = async () => {

        try {
            const response = await updateProjectComponents(projectId, { technologies: selectedTechnologies });
            if (response.EC === 0) {
                fetchSelectedTechnologies();
                triggerToast('The list of technologies has been updated to the project successfully.', true);
                setOpen(false);
            } else {
                triggerToast(`Failed to update technologies: ${response.message}`, false);
            }
        } catch (error) {
            triggerToast('Failed to update technologies.', false);
        }
    };

    useEffect(() => {
        if (components.length > 0) {
            const selectedTechnologyIds = components.map((component) => component.originalTechId);
            setSelectedTechnologies(selectedTechnologyIds);
        } else {
            setSelectedTechnologies([]);
        }
    }, [open, components, projectId]);

    const handleRowsSelected = (selectedRows: string[]) => {
        setSelectedTechnologies(selectedRows);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="project-technologies-modal"
            aria-describedby="project-technologies-description"
        >
            <Box sx={{ width: '90%', height: '80%', margin: 'auto', marginTop: '5%', backgroundColor: 'white', padding: 4, borderRadius: 2, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Project Technologies
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, mt: -2 }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        Select the technologies that apply to this project. After making your selection, click [Save] button to update the list of technologies into the project.
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        color="primary"
                        sx={HeaderButton}
                    >
                        Save
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TableComponentWithCheckbox<ProjectTechnology>
                    rows={technologies}
                    columns={columns}
                    initialVisibility={{
                        _id: false,
                        name: true,
                        version: true,
                        category: true,
                        standard: true,
                    }}
                    hiddenColumnsOnMobile={['category']}
                    onRowsSelected={handleRowsSelected}
                    selectionRows={selectedTechnologies}
                />

            </Box>
        </Modal>
    );
}

export default ProjectTechnologiesSelectedModal;
