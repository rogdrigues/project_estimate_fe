import React from 'react';
import UserHeader from '@/app/(locale)/(user)/user/_component/user-header';
import UserTable from '@/app/(locale)/(user)/user/_component/user-table';
import { getAllDivisions, getAllUsers } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const UserPage = async () => {
    const session = await getServerSession(authOptions);
    const users = await getAllUsers(session?.access_token);
    const divisions = await getAllDivisions(session?.access_token);

    return (
        <div>
            <UserHeader divisions={divisions?.result} />
            <UserTable users={users?.result} paginate={users?.pagination} />
        </div>
    );
}

export default UserPage;
