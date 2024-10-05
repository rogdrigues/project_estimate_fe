'use client';
import { useState } from 'react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { Project } from '@/types';
import { columns } from '@/app/(locale)/(user)/project_review/_table_config/project-review-table-columns';
import { deleteProject, restoreProject } from '@/services';
import ProjectDetailModal from '@/app/(locale)/(user)/project/_component/project-detail-modal';

interface IProps {
    projects: Project[];
}

export default function ProjectReviewTable(props: IProps) {
    const { projects } = props;
    const [dataView, setDataView] = useState<Project | null>(null);
    const [openReview, setOpenReview] = useState(false);

    return (
        <TableComponent
            rows={projects}
            columns={columns}
            onDelete={deleteProject}
            onRestore={restoreProject}
            markWord="project"
            openUpdate={false}
            setOpenUpdate={() => { }}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                _id: false,
                name: true,
                department: true,
                division: true,
                status: true,
                createdAt: true,
                deadline: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['description', 'createdAt', 'status']}
            currentPage="review"
            openReview={openReview}
            setOpenReview={setOpenReview}
            optionReview={
                <ProjectDetailModal
                    open={openReview}
                    setOpen={setOpenReview}
                    projectId={dataView?._id}
                />
            }
        >
            {null}
        </TableComponent>
    );
}
