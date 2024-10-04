'use client';
import { useState } from 'react';
import { restoreChecklist, deleteChecklist } from '@/services';
import { columns } from '@/app/(locale)/(user)/checklist/_table_config/checklist-table-columns';
import { Checklist, Category } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { ChecklistFormModal } from './checklist-form-modal';

interface IProps {
    checklists: Checklist[];
    categories: Category[];
}

export default function ChecklistTable(props: IProps) {
    const { checklists, categories } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Checklist | null>(null);

    return (
        <TableComponent
            rows={checklists}
            columns={columns}
            onDelete={deleteChecklist}
            onRestore={restoreChecklist}
            markWord="checklist"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                _id: false,
                name: true,
                subClass: true,
                category: true,
                priority: true,
                status: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['description', 'note', 'status']}
            currentPage="checklists"
        >
            <ChecklistFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                checklist={dataView}
                categories={categories}
            />
        </TableComponent>
    );
}
