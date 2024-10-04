'use client';

import { useEffect, useState } from 'react';
import { Checklist, ProjectChecklist } from '@/types';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Box, Typography, Modal, Divider } from '@mui/material';
import { updateProjectComponents } from '@/services';
import { columns } from '@/app/(locale)/(user)/checklist/_table_config/checklist-table-columns';
import { useToast } from '@/context/ToastContext';
import TableComponentWithCheckbox from '@/components/_table_form-config/table-checkbox-component';
import { HeaderButton } from '@/styles';

interface IProps {
    fetchSelectedChecklists: () => void;
    projectId: string;
    checklists: Checklist[];
    components: ProjectChecklist[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ProjectChecklistsSelectedModal = (props: IProps) => {
    const { projectId, checklists, open, setOpen, components, fetchSelectedChecklists } = props;
    const { triggerToast } = useToast();
    const [selectedChecklists, setSelectedChecklists] = useState<ProjectChecklist[]>([]);

    const handleSave = async () => {
        try {
            const response = await updateProjectComponents(projectId, { checklists: selectedChecklists });
            if (response.EC === 0) {
                fetchSelectedChecklists();
                triggerToast('The list of checklists has been updated to the project successfully.', true);
                setOpen(false);
            } else {
                triggerToast(`Failed to update checklists: ${response.message}`, false);
            }
        } catch (error) {
            triggerToast('Failed to update checklists.', false);
        }
    };

    useEffect(() => {
        if (components.length > 0) {
            const selectedChecklistIds = components.map((component) => component.originalChecklistId);
            setSelectedChecklists(selectedChecklistIds);
        } else {
            setSelectedChecklists([]);
        }
    }, [open, components, projectId]);

    const handleRowsSelected = (selectedRows: string[]) => {
        setSelectedChecklists(selectedRows);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="project-checklists-modal"
            aria-describedby="project-checklists-description"
        >
            <Box sx={{ width: '90%', height: '80%', margin: 'auto', marginTop: '5%', backgroundColor: 'white', padding: 4, borderRadius: 2, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Project Checklists
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, mt: -2 }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        Select the checklists that apply to this project. After making your selection, click [Save] button to update the list of checklists into the project.
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
                <TableComponentWithCheckbox<ProjectChecklist>
                    rows={checklists}
                    columns={columns}
                    initialVisibility={{
                        _id: false,
                        name: true,
                        subClass: true,
                        category: true,
                        priority: true,
                    }}
                    hiddenColumnsOnMobile={['category']}
                    onRowsSelected={handleRowsSelected}
                    selectionRows={selectedChecklists}
                />

            </Box>
        </Modal>
    );
}

export default ProjectChecklistsSelectedModal;
