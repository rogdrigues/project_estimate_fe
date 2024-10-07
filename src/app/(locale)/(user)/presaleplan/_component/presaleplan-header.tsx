'use client';
import { useState } from 'react';
import { Opportunity } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { PresalePlanFormModal } from './presaleplan-form-modal';

interface IProps {
    opportunities: Opportunity[];
}

export const PresalePlanHeader = (props: IProps) => {
    const { opportunities } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Presale Plans"
            onCreateOpen={() => setOpen(true)}
            hideExportImport={true}
            currentPage="presale_plan"
            modal={
                <PresalePlanFormModal
                    open={open}
                    setOpen={setOpen}
                    presalePlan={null}
                    opportunities={opportunities}
                />
            }
        />
    );
};
