import UserHeader from '@/app/(locale)/(user)/user/_component/user-header';
import UserTable from '@/app/(locale)/(user)/user/_component/user-table';
import { getAllDepartments, getAllDivisions, getAllRoles, getAllUsers } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const UserPage = async () => {
    const session = await getServerSession(authOptions);
    const users = await getAllUsers(session?.access_token);
    const divisions = await getAllDivisions(session?.access_token);
    const departments = await getAllDepartments(session?.access_token);
    const roles = await getAllRoles(session?.access_token);

    return (
        <div>
            <UserHeader
                divisions={divisions?.result}
                departments={departments?.result}
                roles={roles?.result}
            />
            <UserTable
                users={users?.result}
                paginate={users?.pagination}
                divisions={divisions?.result}
                departments={departments?.result}
                roles={roles?.result}
            />
        </div>
    );
}

export default UserPage;
