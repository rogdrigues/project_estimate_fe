'use client';

import { useEffect, useState } from 'react';
import { Productivity, ProjectProductivity, Technology } from '@/types';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Box, Typography, Modal, Divider } from '@mui/material';
import { updateProjectComponents } from '@/services';
import { columns } from '@/app/(locale)/(user)/productivity/_table_config/productivity-table-columns';
import { useToast } from '@/context/ToastContext';
import TableComponentWithCheckbox from '@/components/_table_form-config/table-checkbox-component';
import { flexSpaceBetween, HeaderButton, modalBoxStyleWithBorder } from '@/styles';
import { useRouter } from 'next/navigation';

interface IProps {
    fetchSelectedProductivities: () => void;
    projectId: string;
    productivities: Productivity[];
    components: ProjectProductivity[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ProjectProductivitiesSelectedModal = (props: IProps) => {
    const { projectId, productivities, open, setOpen, components, fetchSelectedProductivities } = props;
    const { triggerToast } = useToast();
    const [selectedProductivities, setSelectedProductivities] = useState<ProjectProductivity[]>([]);
    const router = useRouter();

    const handleSave = async () => {
        try {
            const response = await updateProjectComponents(projectId, { productivity: selectedProductivities });
            if (response.EC === 0) {
                setSelectedProductivities([]);
                router.refresh();
                fetchSelectedProductivities();
                triggerToast('The list of productivities has been updated to the project successfully.', true);
                setOpen(false);
            } else {
                triggerToast(`Failed to update productivities: ${response.message}`, false);
            }
        } catch (error) {
            triggerToast('Failed to update productivities.', false);
        }
    };

    useEffect(() => {
        if (components.length > 0) {
            const selectedProductivityIds = components.map((component) => component.originalProductivityId);
            setSelectedProductivities(selectedProductivityIds);
        } else {
            setSelectedProductivities([]);
        }
    }, [open, components, projectId]);

    const handleRowsSelected = (selectedRows: string[]) => {
        setSelectedProductivities(selectedRows);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="project-productivities-modal"
            aria-describedby="project-productivities-description"
        >
            <Box sx={modalBoxStyleWithBorder}>
                <Box sx={{ ...flexSpaceBetween, padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Project Productivities
                    </Typography>
                </Box>

                <Box sx={{ ...flexSpaceBetween, padding: 2, mt: -2 }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        Select the productivities that apply to this project. After making your selection, click [Save] button to update the list of productivities into the project.
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
                <TableComponentWithCheckbox<ProjectProductivity>
                    rows={productivities}
                    columns={columns}
                    initialVisibility={{
                        _id: false,
                        name: true,
                        version: true,
                        norm: true,
                        unit: true,
                        actions: true,
                    }}
                    hiddenColumnsOnMobile={['technology', 'norm']}
                    onRowsSelected={handleRowsSelected}
                    selectionRows={selectedProductivities}
                />

            </Box>
        </Modal>
    );
}

export default ProjectProductivitiesSelectedModal;
