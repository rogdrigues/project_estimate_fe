'use client';
import { useState } from 'react';
import { Division, Department, Opportunity, PresalePlan } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { PresalePlanFormModal } from './presaleplan-form-modal';

interface PresalePlanHeaderProps {
    divisions: Division[];
    departments: Department[];
    opportunities: Opportunity[];
}

export const PresalePlanHeader = (props: PresalePlanHeaderProps) => {
    const { divisions, departments, opportunities } = props;
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
                    divisions={divisions}
                    departments={departments}
                    opportunities={opportunities}
                />
            }
        />
    );
};
