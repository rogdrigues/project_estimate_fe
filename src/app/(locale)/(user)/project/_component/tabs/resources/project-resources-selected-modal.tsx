'use client';

import { useEffect, useState } from 'react';
import { Resource, ProjectResource } from '@/types';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Box, Typography, Modal, Divider } from '@mui/material';
import { updateProjectComponents } from '@/services';
import { columns } from '@/app/(locale)/(user)/resource/_table-config/resource-table-columns';
import { useToast } from '@/context/ToastContext';
import TableComponentWithCheckbox from '@/components/_table_form-config/table-checkbox-component';
import { flexSpaceBetween, HeaderButton, modalBoxStyleWithBorder } from '@/styles';
import { useRouter } from 'next/navigation';

interface IProps {
    fetchSelectedResources: () => void;
    projectId: string;
    resources: Resource[];
    components: ProjectResource[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ProjectResourcesSelectedModal = (props: IProps) => {
    const { projectId, resources, open, setOpen, components, fetchSelectedResources } = props;
    const { triggerToast } = useToast();
    const [selectedResources, setSelectedResources] = useState<ProjectResource[]>([]);
    const router = useRouter();

    const handleSave = async () => {
        try {
            const response = await updateProjectComponents(projectId, { resources: selectedResources });
            if (response.EC === 0) {
                fetchSelectedResources();
                router.refresh();
                triggerToast('The list of resources has been updated to the project successfully.', true);
                setOpen(false);
            } else {
                triggerToast(`Failed to update resources: ${response.message}`, false);
            }
        } catch (error) {
            triggerToast('Failed to update resources.', false);
        }
    };

    useEffect(() => {
        if (components.length > 0) {
            const selectedResourceIds = components.map((component) => component.originalResourceId);
            setSelectedResources(selectedResourceIds);
        } else {
            setSelectedResources([]);
        }
    }, [open, components, projectId]);

    const handleRowsSelected = (selectedRows: string[]) => {
        setSelectedResources(selectedRows);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="project-resources-modal"
            aria-describedby="project-resources-description"
        >
            <Box sx={modalBoxStyleWithBorder}>
                <Box sx={{ ...flexSpaceBetween, padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Project Resources
                    </Typography>
                </Box>

                <Box sx={{ ...flexSpaceBetween, padding: 2, mt: -2 }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        Select the resources that apply to this project. After making your selection, click [Save] button to update the list of resources into the project.
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
                <TableComponentWithCheckbox<ProjectResource>
                    rows={resources}
                    columns={columns}
                    initialVisibility={{
                        _id: false,
                        name: true,
                        unitPrice: true,
                        location: true,
                        level: true,
                        currency: true,
                    }}
                    hiddenColumnsOnMobile={['location', 'status']}
                    onRowsSelected={handleRowsSelected}
                    selectionRows={selectedResources}
                />

            </Box>
        </Modal>
    );
}

export default ProjectResourcesSelectedModal;
