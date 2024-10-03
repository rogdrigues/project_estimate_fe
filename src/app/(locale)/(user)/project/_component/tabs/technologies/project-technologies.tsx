'use client';
import { useEffect, useState } from 'react';
import { Technology, ProjectTechnology } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { getProjectComponents, getAllTechnologies } from '@/services';
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { columns } from '@/app/(locale)/(user)/technology/_table-config/technology-table-columns';
import ProjectTechnologiesSelectedModal from '@/app/(locale)/(user)/project/_component/tabs/technologies/project-technologies-selected-modal';
import { TechnologyFormModal } from '@/app/(locale)/(user)/technology/_component/technology-form-modal';

interface IProps {
    projectId: string;
}

const ProjectTechnologies = (props: IProps) => {
    const { projectId } = props;
    const [technologies, setTechnologies] = useState<ProjectTechnology[]>([]);
    const [originalTechnologies, setOriginalTechnologies] = useState<Technology[]>([]);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<ProjectTechnology | null>(null);

    const fetchSelectedTechnologies = async () => {
        try {
            const technologyData = await getProjectComponents(projectId, 'technologies');
            setTechnologies(technologyData?.result || []);
        } catch (error: any) {
            console.error(`Error fetching technologies: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchSelectedTechnologies();

                const originalTechnologyData = await getAllTechnologies(session?.access_token);
                setOriginalTechnologies(originalTechnologyData?.result || []);
            } catch (error: any) {
                console.error(`Error fetching technologies: ${error.message}`);
            }
        };

        fetchData();
    }, [projectId]);

    return (
        <>
            <HeaderComponent
                title="Project Technologies"
                onAssignOpen={() => setOpen(true)}
                hideExportImport={true}
                currentPage="project_detail"
                showAssign={true}
                modal={
                    <ProjectTechnologiesSelectedModal
                        fetchSelectedTechnologies={fetchSelectedTechnologies}
                        projectId={projectId}
                        technologies={originalTechnologies}
                        components={technologies}
                        open={open}
                        setOpen={setOpen}
                    />
                }
            />
            <TableComponent
                rows={technologies}
                columns={columns}
                onDelete={async () => { }}
                onRestore={async () => { }}
                markWord="technology"
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataView={dataView}
                setDataView={setDataView}
                initialVisibility={{
                    name: true,
                    version: true,
                    category: true,
                    standard: true,
                    status: true,
                    actions: true,
                }}
                hiddenColumnsOnMobile={['standard', 'status']}
                currentPage="project_detail"
            >
                <TechnologyFormModal
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    technology={dataView}
                    onProjectComponent={true}
                    fetchSelectedTechnologies={fetchSelectedTechnologies}
                />
            </TableComponent>
        </>
    );
};

export default ProjectTechnologies;
