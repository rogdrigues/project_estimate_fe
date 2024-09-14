'use client';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { exportResources, importResources } from '@/services';
import { useState } from 'react';
import { ResourceFormModal } from './resource-form-modal';

const ResourceHeader = () => {
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Resource"
            onExport={exportResources}
            onImport={importResources}
            onCreateOpen={() => setOpen(true)}
            modal={
                <ResourceFormModal
                    open={open}
                    setOpen={setOpen}
                />
            }
        />
    );
};

export default ResourceHeader;
