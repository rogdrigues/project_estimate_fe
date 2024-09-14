'use client';
import { useState } from 'react';
import { deleteResource, restoreResource } from '@/services';
import { Resource } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { ResourceFormModal } from './resource-form-modal';
import { columns } from '@/app/(locale)/(user)/resource/_table-config/resource-table-columns';

interface IProps {
    resources: Resource[];
}

export default function ResourceTable(props: IProps) {
    const { resources } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Resource | null>(null);

    return (
        <TableComponent
            rows={resources}
            columns={columns}
            onDelete={deleteResource}
            onRestore={restoreResource}
            markWord="resource"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                name: true,
                unitPrice: true,
                location: true,
                level: true,
                currency: true,
                status: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['location', 'status']}
        >
            <ResourceFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                resource={dataView}
            />
        </TableComponent>
    );
}
