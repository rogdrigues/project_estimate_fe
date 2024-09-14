'use client';
import { useState } from 'react';
import { DivisionFormModal } from './division-form-modal';
import { restoreDepartment } from '@/services';
import { columns } from '@/app/(locale)/(user)/division/_table_config/division-table-columns';
import { Division, UserMaster } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';

interface IProps {
    divisions: Division[];
    users: UserMaster[];
}

export default function DivisionTable(props: IProps) {
    const { divisions, users } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Division | null>(null);

    return (
        <TableComponent
            rows={divisions}
            columns={columns}
            onDelete={restoreDepartment}
            onRestore={restoreDepartment}
            markWord="division"
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
        >
            <DivisionFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                users={users}
                division={dataView}
            />
        </TableComponent>
    );
}
