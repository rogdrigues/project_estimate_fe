
import { getAllDivisions, getAllUsers } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DivisionHeader from './_component/division-header';
import DivisionTable from './_component/division-table';


const DepartmentPage = async () => {
    const session = await getServerSession(authOptions);
    const divisions = await getAllDivisions(session?.access_token);
    const users = await getAllUsers(session?.access_token);

    return (
        <div>
            <DivisionHeader
                users={users?.result}
            />
            <DivisionTable
                divisions={divisions?.result}
                users={users?.result}
            />
        </div>
    );
}

export default DepartmentPage;
