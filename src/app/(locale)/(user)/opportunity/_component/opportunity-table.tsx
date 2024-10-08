'use client';
import { useState } from 'react';
import TableComponent from '@/components/_table_form-config/table-item-component';
import { Opportunity, Division, Department, Category, UserMaster } from '@/types';
import { columns } from '@/app/(locale)/(user)/opportunity/_table_config/opportunity-table-columns';
import { OpportunityFormModal } from './opportunity-form-modal';
import { deleteOpportunity, restoreOpportunity } from '@/services';
import { OpportunityReviewModal } from './opportunity-form-modal-review';

interface IProps {
    opportunities: Opportunity[];
    divisions: Division[];
    departments: Department[];
    categories: Category[];
    opportunityLeads: UserMaster[];
}

export default function OpportunityTable(props: IProps) {
    const { opportunities, divisions, departments, categories, opportunityLeads } = props;
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [dataView, setDataView] = useState<Opportunity | null>(null);

    return (
        <TableComponent
            rows={opportunities}
            columns={columns}
            onDelete={deleteOpportunity}
            onRestore={restoreOpportunity}
            markWord="opportunity"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                _id: false,
                name: true,
                customerName: true,
                division: true,
                department: true,
                timeline: true,
                budget: true,
                status: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['description', 'scope', 'budget']}
            currentPage="opportunity"
            optionReview={
                <OpportunityReviewModal
                    isOpen={openReview}
                    setOpen={setOpenReview}
                    opportunity={dataView}
                    categories={categories}
                    divisions={divisions}
                    departments={departments}
                    opportunityLeads={opportunityLeads}
                />
            }
            openReview={openReview}
            setOpenReview={setOpenReview}
        >
            <OpportunityFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                opportunity={dataView}
                departments={departments}
                categories={categories}
                opportunityLeads={opportunityLeads}
            />
        </TableComponent>
    );
}
