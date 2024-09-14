
import { getAllDepartments, getAllDivisions, getAllUsers } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DepartmentTable from './_component/department-table';
import DepartmentHeader from './_component/department-header';

const DepartmentPage = async () => {
    const session = await getServerSession(authOptions);
    const divisions = await getAllDivisions(session?.access_token);
    const departments = await getAllDepartments(session?.access_token, true);
    const users = await getAllUsers(session?.access_token);

    return (
        <div>
            <DepartmentHeader
                divisions={divisions?.result}
                users={users?.result}
            />
            <DepartmentTable
                divisions={divisions?.result}
                departments={departments?.result}
                users={users?.result}
            />
        </div>
    );
}

export default DepartmentPage;
