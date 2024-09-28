'use client';
import { useState } from 'react';
import { columns } from '@/app/(locale)/(user)/template/_table-config/template-table-columns';
import { Category, Template } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { deleteTemplate, restoreTemplate } from '@/services';
import { TemplateFormModal } from './template-form-modal';

interface IProps {
    categories: Category[];
    templates: Template[];
}

export default function TemplateTable(props: IProps) {
    const { templates, categories } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Template | null>(null);

    return (
        <TableComponent
            rows={templates}
            columns={columns}
            onDelete={deleteTemplate}
            onRestore={restoreTemplate}
            markWord="template"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                name: true,
                description: true,
                filePath: true,
                createdBy: true,
                status: true,
                version: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['createdBy', 'status']}
            currentPage="template"
        >
            <TemplateFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                categories={categories}
                template={dataView}
            />
        </TableComponent>
    );
}
