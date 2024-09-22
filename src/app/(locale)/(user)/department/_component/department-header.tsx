'use client'
import { DepartmentFormModal } from './department-form-modal';
import { exportDepartments, importDepartments } from '@/services';
import { Division } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';
import { useState } from 'react';

interface IProps {
    divisions: Division[];
}

const DepartmentHeader = (props: IProps) => {
    const { divisions } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="Department"
            onExport={exportDepartments}
            onImport={importDepartments}
            onCreateOpen={() => setOpen(true)}
            currentPage="departments"
            modal={
                <DepartmentFormModal
                    open={open}
                    setOpen={setOpen}
                    divisions={divisions}
                />
            }
        />
    );
};

export default DepartmentHeader;
