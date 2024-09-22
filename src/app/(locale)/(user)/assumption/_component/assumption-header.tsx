'use client'
import React, { useState } from 'react';
import { AssumptionFormModal } from './assumption-form-modal';
import { exportAssumptions, importAssumptions } from '@/services';
import { Category } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';

interface IProps {
    categories: Category[];
}

const AssumptionHeader = (props: IProps) => {
    const { categories } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Assumption"
            onExport={exportAssumptions}
            onImport={importAssumptions}
            onCreateOpen={() => setOpen(true)}
            currentPage='assumptions'
            modal={
                <AssumptionFormModal
                    open={open}
                    setOpen={setOpen}
                    categories={categories}
                />
            }
        />
    );
};

export default AssumptionHeader;
