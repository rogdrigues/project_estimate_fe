import UserHeader from '@/app/(locale)/(user)/user/_component/user-header';
import UserTable from '@/app/(locale)/(user)/user/_component/user-table';
import { getAllDepartments, getAllDivisions, getAllRoles, getAllUsers } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Box } from '@mui/material';

const UserPage = async () => {
    const session = await getServerSession(authOptions);
    const [users, divisions, departments, roles] = await Promise.all([
        getAllUsers(session?.access_token, true),
        getAllDivisions(session?.access_token),
        getAllDepartments(session?.access_token),
        getAllRoles(session?.access_token)
    ]);

    return (
        <Box sx={{ p: 3 }}>
            <UserHeader
                divisions={divisions?.result}
                departments={departments?.result}
                roles={roles?.result}
            />
            <UserTable
                users={users?.result || []}
                paginate={users?.pagination}
                divisions={divisions?.result}
                departments={departments?.result}
                roles={roles?.result}
            />
        </Box>
    );
}

export default UserPage;