'use client';
import { useState } from 'react';
import { restoreProductivity, deleteProductivity } from '@/services';
import { columns } from '@/app/(locale)/(user)/productivity/_table_config/productivity-table-columns';
import { Productivity, Technology } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { ProductivityFormModal } from './productivity-form-modal';

interface IProps {
    productivities: Productivity[];
    technologies: Technology[];
}

export default function ProductivityTable(props: IProps) {
    const { productivities, technologies } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Productivity | null>(null);

    return (
        <TableComponent
            rows={productivities}
            columns={columns}
            onDelete={deleteProductivity}
            onRestore={restoreProductivity}
            markWord="productivity"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                productivity: true,
                technology: true,
                norm: true,
                unit: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['technology', 'norm']}
        >
            <ProductivityFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                productivityData={dataView}
                technologies={technologies}
            />
        </TableComponent>
    );
}
