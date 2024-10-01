'use client';
import { useState } from 'react';
import { Category, Opportunity, Template, UserMaster } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { ProjectFormModal } from './project-form-modal';

interface IProps {
    categories: Category[];
    opportunities: Opportunity[];
    templates: Template[];
    reviewers: UserMaster[];
}

export const ProjectHeader = (props: IProps) => {
    const { categories, opportunities, templates, reviewers } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Project"
            onCreateOpen={() => setOpen(true)}
            hideExportImport={true}
            currentPage="projects"
            modal={
                <ProjectFormModal
                    open={open}
                    setOpen={setOpen}
                    categories={categories}
                    opportunities={opportunities}
                    templates={templates}
                    reviewers={reviewers}
                />
            }
        />
    );
};
