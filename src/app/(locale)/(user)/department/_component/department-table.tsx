'use client';
import { useState } from 'react';
import { DepartmentFormModal } from './department-form-modal';
import { deleteDepartment, restoreDepartment } from '@/services';
import { columns } from '@/app/(locale)/(user)/department/_table_config/department-table-columns';
import { Department, Division } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';

interface IProps {
    departments: Department[];
    divisions: Division[];
}

export default function DepartmentTable(props: IProps) {
    const { departments, divisions } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Department | null>(null);

    return (
        <TableComponent
            rows={departments}
            columns={columns}
            onDelete={deleteDepartment}
            onRestore={restoreDepartment}
            markWord="department"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                name: true,
                description: true,
                division: true,
                lead: true,
                code: true,
                status: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['description', 'status']}
            currentPage="departments"
        >
            <DepartmentFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                divisions={divisions}
                department={dataView}
            />
        </TableComponent>
    );
}
