'use client';
import { useState } from 'react';
import { AssumptionFormModal } from './assumption-form-modal';
import { deleteAssumption, restoreAssumption } from '@/services';
import { columns } from '@/app/(locale)/(user)/assumption/_table_config/assumption-table-columns';
import { Assumption, Category } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';

interface IProps {
    assumptions: Assumption[];
    categories: Category[];
}

export default function AssumptionTable(props: IProps) {
    const { assumptions, categories } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Assumption | null>(null);

    return (
        <TableComponent
            rows={assumptions}
            columns={columns}
            onDelete={deleteAssumption}
            onRestore={restoreAssumption}
            markWord="assumption"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                _id: false,
                title: true,
                content: true,
                category: true,
                subCategory: true,
                status: true,
            }}
            hiddenColumnsOnMobile={['subCategory', 'status']}
            currentPage="assumptions"
        >
            <AssumptionFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                categories={categories}
                assumption={dataView}
            />
        </TableComponent>
    );
}
