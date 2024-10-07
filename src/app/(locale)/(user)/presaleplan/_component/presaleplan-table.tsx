'use client';
import { useState } from 'react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { PresalePlan, Opportunity } from '@/types';
import { columns } from '@/app/(locale)/(user)/presaleplan/_table_config/presaleplan-table-columns';
import { PresalePlanFormModal } from './presaleplan-form-modal';
import { deletePresalePlan, restorePresalePlan } from '@/services';
import { PresalePlanReviewModal } from './presaleplan-form-review-modal';

interface IProps {
    presalePlans: PresalePlan[];
    opportunities: Opportunity[];
}

export default function PresalePlanTable(props: IProps) {
    const { presalePlans, opportunities } = props;
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
                _id: false,
                name: true,
                department: true,
                division: true,
                status: true,
                createdBy: true,
                pendingUntil: true,
                actions: true,
            }}
            optionReview={
                <PresalePlanReviewModal
                    open={openReview}
                    setOpen={setOpenReview}
                    presalePlan={dataView}
                />
            }
            hiddenColumnsOnMobile={['description', 'pendingUntil']}
            currentPage="presale_plan"
            openReview={openReview}
            setOpenReview={setOpenReview}
        >
            <PresalePlanFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                presalePlan={dataView}
                opportunities={opportunities}
            />
        </TableComponent>
    );
}
