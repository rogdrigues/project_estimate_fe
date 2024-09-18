'use client'
import { useState } from 'react';
import { ProductivityFormModal } from './productivity-form-modal';
import { exportProductivities, importProductivities } from '@/services';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { Technology } from '@/types';

interface IProps {
    technologies: Technology[];
}

const ProductivityHeader = (props: IProps) => {
    const { technologies } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Productivity"
            onExport={exportProductivities}
            onImport={importProductivities}
            onCreateOpen={() => setOpen(true)}
            modal={
                <ProductivityFormModal
                    open={open}
                    setOpen={setOpen}
                    technologies={technologies}
                />
            }
        />
    );
};

export default ProductivityHeader;
