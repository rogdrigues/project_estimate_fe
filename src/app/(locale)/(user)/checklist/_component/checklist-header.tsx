'use client'
import { ChecklistFormModal } from './checklist-form-modal';
import { exportChecklists, importChecklists } from '@/services';
import { Category } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { useState } from 'react';

interface IProps {
    categories: Category[];
}

const ChecklistHeader = (props: IProps) => {
    const { categories } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Checklist"
            onExport={exportChecklists}
            onImport={importChecklists}
            onCreateOpen={() => setOpen(true)}
            modal={
                <ChecklistFormModal
                    open={open}
                    setOpen={setOpen}
                    categories={categories}
                />
            }
        />
    );
};

export default ChecklistHeader;
