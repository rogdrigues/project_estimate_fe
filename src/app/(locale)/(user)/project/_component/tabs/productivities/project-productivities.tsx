'use client';

import { useEffect, useState } from 'react';
import { Productivity, ProjectProductivity, Technology } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { getProjectComponents, getAllTechnologies, getAllProductivities } from '@/services';
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import ProjectProductivitiesSelectedModal from './project-productivities-selected-modal';
import { columns } from '@/app/(locale)/(user)/productivity/_table_config/productivity-table-columns';
import { ProductivityFormModal } from '@/app/(locale)/(user)/productivity/_component/productivity-form-modal';

interface IProps {
    projectId: string;
}

const ProjectProductivities = (props: IProps) => {
    const { projectId } = props;
    const [productivities, setProductivities] = useState<ProjectProductivity[]>([]);
    const [originalProductivities, setOriginalProductivities] = useState<Productivity[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<ProjectProductivity | null>(null);

    const fetchSelectedProductivities = async () => {
        try {
            const productivityData = await getProjectComponents(projectId, 'productivity');
            setProductivities(productivityData?.result || []);
        } catch (error: any) {
            console.error(`Error fetching productivities: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchSelectedProductivities();

                const originalProductivityData = await getAllProductivities(session?.access_token);
                setOriginalProductivities(originalProductivityData?.result || []);

                const technologyData = await getAllTechnologies(session?.access_token);
                setTechnologies(technologyData?.result || []);
            } catch (error: any) {
                console.error(`Error fetching productivities or technologies: ${error.message}`);
            }
        };

        fetchData();
    }, [projectId]);

    return (
        <>
            <HeaderComponent
                title="Project Productivities"
                onAssignOpen={() => setOpen(true)}
                hideExportImport={true}
                currentPage="project_detail"
                showAssign={true}
                modal={
                    <ProjectProductivitiesSelectedModal
                        fetchSelectedProductivities={fetchSelectedProductivities}
                        projectId={projectId}
                        productivities={originalProductivities}
                        components={productivities}
                        technologies={technologies}
                        open={open}
                        setOpen={setOpen}
                    />
                }
            />
            <TableComponent
                rows={productivities}
                columns={columns}
                onDelete={async () => { }}
                onRestore={async () => { }}
                markWord="productivity"
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataView={dataView}
                setDataView={setDataView}
                initialVisibility={{
                    name: true,
                    version: true,
                    norm: true,
                    unit: true,
                }}
                hiddenColumnsOnMobile={['norm']}
                currentPage="project_detail"
            >
                <ProductivityFormModal
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    productivityData={dataView}
                    technologies={technologies}
                    onProjectComponent={true}
                    fetchSelectedProductivities={fetchSelectedProductivities}
                />
            </TableComponent>
        </>
    );
};

export default ProjectProductivities;
