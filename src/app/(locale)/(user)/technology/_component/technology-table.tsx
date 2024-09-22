'use client';
import { useState } from 'react';
import { deleteTechnology, restoreTechnology } from '@/services';
import { columns } from '@/app/(locale)/(user)/technology/_table-config/technology-table-columns';
import { Technology } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { TechnologyFormModal } from './technology-form-modal';

interface IProps {
    technologies: Technology[];
}

export default function TechnologyTable(props: IProps) {
    const { technologies } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Technology | null>(null);

    return (
        <TableComponent
            rows={technologies}
            columns={columns}
            onDelete={deleteTechnology}
            onRestore={restoreTechnology}
            markWord="technology"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                name: true,
                version: true,
                category: true,
                standard: true,
                status: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['standard', 'status']}
            currentPage="technology"
        >
            <TechnologyFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                technology={dataView}
            />
        </TableComponent>
    );
}
