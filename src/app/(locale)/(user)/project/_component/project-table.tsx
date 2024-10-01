'use client';
import { useState } from 'react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { Project, Opportunity, UserMaster, Category, Template } from '@/types';
import { columns } from '@/app/(locale)/(user)/project/_table_config/project-table-columns';
import { ProjectFormModal } from './project-form-modal';
import { deleteProject, restoreProject } from '@/services';

interface IProps {
    projects: Project[];
    categories: Category[];
    opportunities: Opportunity[];
    templates: Template[];
    reviewers: UserMaster[];
}

export default function ProjectTable(props: IProps) {
    const { projects, opportunities, reviewers, categories, templates } = props;
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Project | null>(null);
    const [openReview, setOpenReview] = useState(false);

    return (
        <TableComponent
            rows={projects}
            columns={columns}
            onDelete={deleteProject}
            onRestore={restoreProject}
            markWord="project"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                name: true,
                department: true,
                division: true,
                status: true,
                createdAt: true,
                deadline: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['description', 'createdAt', 'status']}
            currentPage="projects"
            openReview={openReview}
            setOpenReview={setOpenReview}
            optionReview={null}
        >
            <ProjectFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                project={dataView}
                opportunities={opportunities}
                reviewers={reviewers}
                categories={categories}
                templates={templates}
            />
        </TableComponent>
    );
}
