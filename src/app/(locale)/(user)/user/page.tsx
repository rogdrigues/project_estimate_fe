import React from 'react';
import UserHeader from '@/app/(locale)/(user)/user/_component/user-header';
import UserTable from '@/app/(locale)/(user)/user/_component/user-table';
const UserPage = () => {
    return (
        <div>
            <UserHeader />
            <UserTable />
        </div>
    );
}

export default UserPage;
