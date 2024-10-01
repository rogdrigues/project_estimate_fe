'use client';
import { useState } from 'react';
import { OpportunityFormModal } from './opportunity-form-modal';
import { Division, Department, Category, UserMaster } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';

interface IProps {
    divisions: Division[];
    departments: Department[];
    categories: Category[];
    opportunityLeads: UserMaster[];
}

export const OpportunityHeader = (props: IProps) => {
    const { divisions, departments, categories, opportunityLeads } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Opportunities"
            onCreateOpen={() => setOpen(true)}
            hideExportImport={true}
            currentPage="opportunity"
            modal={
                <OpportunityFormModal
                    open={open}
                    setOpen={setOpen}
                    opportunity={null}
                    divisions={divisions}
                    departments={departments}
                    categories={categories}
                    opportunityLeads={opportunityLeads}
                />
            }
        />
    );
};
