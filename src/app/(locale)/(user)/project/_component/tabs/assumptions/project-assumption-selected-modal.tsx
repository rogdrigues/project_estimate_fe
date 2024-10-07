'use client';

import { useEffect, useState } from 'react';
import { Assumption, ProjectAssumption } from '@/types';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Box, Typography, Modal, Divider } from '@mui/material';
import { updateProjectComponents } from '@/services';
import { columns } from '@/app/(locale)/(user)/assumption/_table_config/assumption-table-columns';
import { useToast } from '@/context/ToastContext';
import TableComponentWithCheckbox from '@/components/_table_form-config/table-checkbox-component';
import { HeaderButton } from '@/styles';
import { useRouter } from 'next/navigation';

interface IProps {
    fetchSelectedAssumptions: () => void;
    projectId: string;
    assumptions: Assumption[];
    components: ProjectAssumption[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ProjectAssumptionsSelectedModal = (props: IProps) => {
    const { projectId, assumptions, open, setOpen, components, fetchSelectedAssumptions } = props;
    const { triggerToast } = useToast();
    const [selectedAssumptions, setSelectedAssumptions] = useState<ProjectAssumption[]>([]);
    const router = useRouter();
    const handleSave = async () => {

        try {
            const response = await updateProjectComponents(projectId, { assumptions: selectedAssumptions });
            if (response.EC === 0) {
                fetchSelectedAssumptions();
                router.refresh();
                triggerToast('The list of assumptions has been updated to the project successfully.', true);
                setOpen(false);
            } else {
                triggerToast(`Failed to update assumptions: ${response.message}`, false);
            }
        } catch (error) {
            triggerToast('Failed to update assumptions.', false);
        }
    };

    useEffect(() => {
        if (components.length > 0) {
            const selectedAssumptionIds = components.map((component) => component.originalAssumptionId);
            setSelectedAssumptions(selectedAssumptionIds);
        } else {
            setSelectedAssumptions([]);
        }
    }, [open, components, projectId]);

    const handleRowsSelected = (selectedRows: string[]) => {
        setSelectedAssumptions(selectedRows);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="project-assumptions-modal"
            aria-describedby="project-assumptions-description"
        >
            <Box sx={{ width: '90%', height: '80%', margin: 'auto', marginTop: '5%', backgroundColor: 'white', padding: 4, borderRadius: 2, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Project Assumptions
                    </Typography>
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, mt: -2 }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        Select the assumptions that apply to this project. After making your selection, click [Save] button to update list of assumptions into the project.
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
                <TableComponentWithCheckbox<ProjectAssumption>
                    rows={assumptions}
                    columns={columns}
                    initialVisibility={{
                        _id: false,
                        title: true,
                        content: true,
                        category: true,
                        subCategory: true,
                    }}
                    hiddenColumnsOnMobile={['subCategory']}
                    onRowsSelected={handleRowsSelected}
                    selectionRows={selectedAssumptions}
                />

            </Box>
        </Modal>
    );
}

export default ProjectAssumptionsSelectedModal;
