'use client'
import { DepartmentFormModal } from './department-form-modal';
import { exportDepartments, importDepartments } from '@/services';
import { Division, UserMaster } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { useState } from 'react';

interface IProps {
    divisions: Division[];
    users: UserMaster[];
}

const DepartmentHeader = (props: IProps) => {
    const { divisions, users } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Department"
            onExport={exportDepartments}
            onImport={importDepartments}
            onCreateOpen={() => setOpen(true)}
            modal={
                <DepartmentFormModal
                    open={open}
                    setOpen={setOpen}
                    divisions={divisions}
                    users={users}
                />
            }
        />
    );
};

export default DepartmentHeader;
