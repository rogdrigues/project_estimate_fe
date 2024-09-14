'use client';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { DivisionFormModal } from './division-form-modal';
import { exportDivisions, importDivisions } from '@/services';
import { UserMaster } from '@/types';
import { useState } from 'react';

interface IProps {
    users: UserMaster[];
}

const DivisionHeader = (props: IProps) => {
    const { users } = props;
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
                    users={users}
                />
            }
        />
    );
};

export default DivisionHeader;
v