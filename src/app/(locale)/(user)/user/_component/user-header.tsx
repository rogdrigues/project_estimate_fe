'use client';
import React, { useState } from 'react';
import { UserFormModal } from './user-form-modal';
import { exportFile, importUsersFromExcel } from '@/services';
import { Department, Division, Role } from '@/types';
import HeaderComponent from '@/components/_table_form-config/header-item-component';

interface IProps {
    divisions: Division[];
    departments: Department[];
    roles: Role[];
}

const UserHeader = (props: IProps) => {
    const { divisions, departments, roles } = props;
    const [open, setOpen] = useState(false);

    return (
        <HeaderComponent
            title="User"
            onExport={exportFile}
            onImport={importUsersFromExcel}
            onCreateOpen={() => setOpen(true)}
            modal={
                <UserFormModal
                    open={open}
                    setOpen={setOpen}
                    divisions={divisions}
                    departments={departments}
                    roles={roles}
                />
            }
        />
    );
};

export default UserHeader;
