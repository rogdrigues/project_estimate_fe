'use client';
import { useEffect, useState } from 'react';
import { Assumption, Category, ProjectAssumption } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { getProjectComponents, getAllCategories, getAllAssumptions } from '@/services'; // giả sử bạn đã có hàm getCategories
import { useSession } from 'next-auth/react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { columns } from '@/app/(locale)/(user)/assumption/_table_config/assumption-table-columns';
import ProjectAssumptionsSelectedModal from './project-assumption-selected-modal';
import { AssumptionFormModal } from '@/app/(locale)/(user)/assumption/_component/assumption-form-modal';
interface IProps {
    projectId: string;
}

const ProjectAssumptions = (props: IProps) => {
    const { projectId } = props;
    const [assumptions, setAssumptions] = useState<ProjectAssumption[]>([]);
    const [originalAssumptions, setOriginalAssumptions] = useState<Assumption[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<ProjectAssumption | null>(null);

    const fetchSelectedAssumptions = async () => {
        try {
            const assumptionData = await getProjectComponents(projectId, 'assumptions');
            setAssumptions(assumptionData?.result || []);
        } catch (error: any) {
            console.error(`Error fetching assumptions: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchSelectedAssumptions();

                const originalAssumptionData = await getAllAssumptions(session?.access_token);
                setOriginalAssumptions(originalAssumptionData?.result || []);

                const categoryData = await getAllCategories(session?.access_token);
                setCategories(categoryData?.result || []);
            } catch (error: any) {
                console.error(`Error fetching assumptions: ${error.message}`);
            }
        };

        fetchData();
    }, [projectId]);

    return (

        <>
            <HeaderComponent
                title="Project Assumptions"
                onAssignOpen={() => setOpen(true)}
                hideExportImport={true}
                currentPage="project_detail"
                showAssign={true}
                modal={
                    <ProjectAssumptionsSelectedModal
                        fetchSelectedAssumptions={fetchSelectedAssumptions}
                        projectId={projectId}
                        assumptions={originalAssumptions}
                        components={assumptions}
                        categories={categories}
                        open={open}
                        setOpen={setOpen}
                    />
                }
            />
            <TableComponent
                rows={assumptions}
                columns={columns}
                onDelete={async () => { }}
                onRestore={async () => { }}
                markWord="assumption"
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataView={dataView}
                setDataView={setDataView}
                initialVisibility={{
                    title: true,
                    content: true,
                    category: true,
                    subCategory: true,
                    status: true,
                }}
                hiddenColumnsOnMobile={['subCategory', 'status']}
                currentPage="project_detail"
            >
                <AssumptionFormModal
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    categories={categories}
                    assumption={dataView}
                    onProjectComponent={true}
                    fetchSelectedAssumptions={fetchSelectedAssumptions}
                />
            </TableComponent>
        </>

    );
};

export default ProjectAssumptions;