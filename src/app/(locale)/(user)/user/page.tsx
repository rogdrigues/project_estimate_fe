import React from 'react';
import UserHeader from '@/app/(locale)/(user)/user/_component/user-header';
import UserTable from '@/app/(locale)/(user)/user/_component/user-table';
import { getAllUsers } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
const UserPage = async () => {
    const session = await getServerSession(authOptions);
    const users = await getAllUsers(session?.access_token);

    return (
        <div>
            <UserHeader />
            <UserTable users={users?.result} paginate={users?.pagination} />
        </div>
    );
}

export default UserPage;
