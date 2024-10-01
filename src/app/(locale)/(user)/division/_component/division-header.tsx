'use client';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { DivisionFormModal } from './division-form-modal';
import { exportDivisions, importDivisions } from '@/services';
import { useState } from 'react';

const DivisionHeader = () => {
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Division"
            onExport={exportDivisions}
            onImport={importDivisions}
            onCreateOpen={() => setOpen(true)}
            modal={
                <DivisionFormModal
                    open={open}
                    setOpen={setOpen}
                />
            }
            currentPage="division"
        />
    );
};

export default DivisionHeader;