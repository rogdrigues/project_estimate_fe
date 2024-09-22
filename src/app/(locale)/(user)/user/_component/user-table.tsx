'use client'
import { useState } from 'react';
import { Department, Division, Role, UserMaster } from '@/types';
import { columns } from '@/app/(locale)/(user)/user/_table-config/user-table-columns';
import { UserFormModal } from './user-form-modal';
import { deleteUser, restoreUser } from '@/services';
import TableComponent from '@/components/_table_form-config/table-item-component';

interface IProps {
    users: UserMaster[];
    paginate: any;
    divisions: Division[];
    departments: Department[];
    roles: Role[];
}

export default function UserTable(props: IProps) {
    const { users, divisions, departments, roles } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<UserMaster | null>(null);

    return (
        <TableComponent
            rows={users}
            columns={columns}
            onDelete={deleteUser}
            onRestore={restoreUser}
            markWord="user"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                email: true,
                role: true,
                division: true,
                department: true,
                phoneNumber: true,
                status: true,
                actions: true,
            }}
            hiddenColumnsOnMobile={['division', 'department', 'phoneNumber', 'status']}
            currentPage="users"
        >
            <UserFormModal
                divisions={divisions}
                departments={departments}
                roles={roles}
                open={openUpdate}
                setOpen={setOpenUpdate}
                User={dataView}
            />
        </TableComponent>
    );
}
