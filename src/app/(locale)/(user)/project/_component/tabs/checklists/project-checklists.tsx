'use client';
import { useEffect, useState } from 'react';
import { Checklist, ProjectChecklist, Category } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { getProjectComponents, getAllChecklists, getAllCategories } from '@/services'; // API gọi category
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { columns } from '@/app/(locale)/(user)/checklist/_table_config/checklist-table-columns';
import ProjectChecklistsSelectedModal from '@/app/(locale)/(user)/project/_component/tabs/checklists/project-checklists-selected-modal';
import { ChecklistFormModal } from '@/app/(locale)/(user)/checklist/_component/checklist-form-modal';

interface IProps {
    projectId: string;
}

const ProjectChecklists = (props: IProps) => {
    const { projectId } = props;
    const [checklists, setChecklists] = useState<ProjectChecklist[]>([]);
    const [originalChecklists, setOriginalChecklists] = useState<Checklist[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); // Thêm state cho categories
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<ProjectChecklist | null>(null);

    const fetchSelectedChecklists = async () => {
        try {
            const checklistData = await getProjectComponents(projectId, 'checklists');
            setChecklists(checklistData?.result || []);
        } catch (error: any) {
            console.error(`Error fetching checklists: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchSelectedChecklists();

                const originalChecklistData = await getAllChecklists(session?.access_token);
                setOriginalChecklists(originalChecklistData?.result || []);

                const categoryData = await getAllCategories(session?.access_token);
                setCategories(categoryData?.result || []);
            } catch (error: any) {
                console.error(`Error fetching data: ${error.message}`);
            }
        };

        fetchData();
    }, [projectId]);

    return (
        <>
            <HeaderComponent
                title="Project Checklists"
                onAssignOpen={() => setOpen(true)}
                hideExportImport={true}
                currentPage="project_detail"
                showAssign={true}
                modal={
                    <ProjectChecklistsSelectedModal
                        fetchSelectedChecklists={fetchSelectedChecklists}
                        projectId={projectId}
                        checklists={originalChecklists}
                        components={checklists}
                        open={open}
                        setOpen={setOpen}
                    />
                }
            />
            <TableComponent
                rows={checklists}
                columns={columns}
                onDelete={async () => { }}
                onRestore={async () => { }}
                markWord="checklist"
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataView={dataView}
                setDataView={setDataView}
                initialVisibility={{
                    name: true,
                    subClass: true,
                    category: true,
                    priority: true,
                    status: false,
                    actions: true,
                }}
                hiddenColumnsOnMobile={['description, status']}
                currentPage="project_detail"
            >
                <ChecklistFormModal
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    checklist={dataView}
                    categories={categories}
                    onProjectComponent={true}
                    fetchSelectedChecklists={fetchSelectedChecklists}
                />
            </TableComponent>
        </>
    );
};

export default ProjectChecklists;
