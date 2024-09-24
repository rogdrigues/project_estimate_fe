'use client';
import { useState } from 'react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { PresalePlan, Division, Department, UserMaster, Opportunity } from '@/types';
import { columns } from '@/app/(locale)/(user)/presaleplan/_table_config/presaleplan-table-columns';
import { PresalePlanFormModal } from './presaleplan-form-modal';
import { deletePresalePlan, restorePresalePlan } from '@/services';

interface IProps {
    presalePlans: PresalePlan[];
    divisions: Division[];
    departments: Department[];
    opportunities: Opportunity[];
}

export default function PresalePlanTable(props: IProps) {
    const { presalePlans, divisions, departments, opportunities } = props;
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [dataView, setDataView] = useState<PresalePlan | null>(null);

    return (
        <TableComponent
            rows={presalePlans}
            columns={columns}
            onDelete={deletePresalePlan}
            onRestore={restorePresalePlan}
            markWord="presale plan"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                name: true,
                department: true,
                division: true,
                status: true,
                createdBy: true,
                pendingUntil: true,
                actions: true,
            }}
            optionReview={null} //Deal later
            hiddenColumnsOnMobile={['description', 'pendingUntil']}
            currentPage="presale_plan"
            openReview={openReview}
            setOpenReview={setOpenReview}
        >
            <PresalePlanFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                presalePlan={dataView}
                divisions={divisions}
                departments={departments}
                opportunities={opportunities}
            />
        </TableComponent>
    );
}
