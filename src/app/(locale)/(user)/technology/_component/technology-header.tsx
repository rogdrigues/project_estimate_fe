'use client';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { exportTechnologies, importTechnologies } from '@/services';
import { useState } from 'react';
import { TechnologyFormModal } from './technology-form-modal';

const TechnologyHeader = () => {
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Technology"
            onExport={exportTechnologies}
            onImport={importTechnologies}
            onCreateOpen={() => setOpen(true)}
            currentPage="technology"
            modal={
                <TechnologyFormModal
                    open={open}
                    setOpen={setOpen}
                />
            }
        />
    );
};

export default TechnologyHeader;
