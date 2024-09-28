'use client';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { useState } from 'react';
import { downloadTemplateSample } from '@/services/template';
import { TemplateFormModal } from './template-form-modal';
import { Category } from '@/types';

interface IProps {
    categories: Category[];
}

const TemplateHeader = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const { categories } = props;
    return (
        <HeaderComponent
            title="Template"
            onCreateOpen={() => setOpen(true)}
            hideExportImport={true}
            onExport={downloadTemplateSample}
            showGuideTemplate={true}
            currentPage="template"
            modal={
                <TemplateFormModal
                    open={open}
                    setOpen={setOpen}
                    categories={categories}
                />
            }
        />
    );
};

export default TemplateHeader;
