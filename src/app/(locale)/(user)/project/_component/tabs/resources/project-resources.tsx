'use client';
import { useEffect, useState } from 'react';
import { Resource, ProjectResource } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { getProjectComponents, getAllResources } from '@/services';
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { columns } from '@/app/(locale)/(user)/resource/_table-config/resource-table-columns';
import ProjectResourcesSelectedModal from '@/app/(locale)/(user)/project/_component/tabs/resources/project-resources-selected-modal';
import { ResourceFormModal } from '@/app/(locale)/(user)/resource/_component/resource-form-modal';

interface IProps {
    projectId: string;
}

const ProjectResources = (props: IProps) => {
    const { projectId } = props;
    const [resources, setResources] = useState<ProjectResource[]>([]);
    const [originalResources, setOriginalResources] = useState<Resource[]>([]);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<ProjectResource | null>(null);

    const fetchSelectedResources = async () => {
        try {
            const resourceData = await getProjectComponents(projectId, 'resources');
            setResources(resourceData?.result || []);
        } catch (error: any) {
            console.error(`Error fetching resources: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchSelectedResources();

                const originalResourceData = await getAllResources(session?.access_token);
                setOriginalResources(originalResourceData?.result || []);
            } catch (error: any) {
                console.error(`Error fetching resources: ${error.message}`);
            }
        };

        fetchData();
    }, [projectId]);

    return (
        <>
            <HeaderComponent
                title="Project Resources"
                onAssignOpen={() => setOpen(true)}
                hideExportImport={true}
                currentPage="project_detail"
                showAssign={true}
                modal={
                    <ProjectResourcesSelectedModal
                        fetchSelectedResources={fetchSelectedResources}
                        projectId={projectId}
                        resources={originalResources}
                        components={resources}
                        open={open}
                        setOpen={setOpen}
                    />
                }
            />
            <TableComponent
                rows={resources}
                columns={columns}
                onDelete={async () => { }}
                onRestore={async () => { }}
                markWord="resource"
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataView={dataView}
                setDataView={setDataView}
                initialVisibility={{
                    _id: false,
                    name: true,
                    unitPrice: true,
                    location: true,
                    level: true,
                    currency: true,
                    status: true,
                    actions: true,
                }}
                hiddenColumnsOnMobile={['location', 'status']}
                currentPage="project_detail"
            >
                <ResourceFormModal
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    resource={dataView}
                    onProjectComponent={true}
                    fetchSelectedResources={fetchSelectedResources}
                />
            </TableComponent>
        </>
    );
};

export default ProjectResources;
