'use client'
import { useState } from 'react';
import { CategoryFormModal } from './category-form-modal';
import { exportCategories, importCategories } from '@/services';
import HeaderComponent from '@/components/_table_form-config/header-item-component';

const CategoryHeader = () => {
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Category"
            onExport={exportCategories}
            onImport={importCategories}
            onCreateOpen={() => setOpen(true)}
            modal={
                <CategoryFormModal
                    open={open}
                    setOpen={setOpen}
                />
            }
        />
    );
};

export default CategoryHeader;
