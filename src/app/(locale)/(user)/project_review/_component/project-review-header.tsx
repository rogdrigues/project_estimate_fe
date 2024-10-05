'use client';
import HeaderComponent from '@/components/_table_form-config/header-item-component';

export const ProjectReviewHeader = () => {
    return (
        <HeaderComponent
            title="Project"
            onCreateOpen={() => { }}
            hideExportImport={true}
            currentPage="projects"
            modal={null}
        />
    );
};
