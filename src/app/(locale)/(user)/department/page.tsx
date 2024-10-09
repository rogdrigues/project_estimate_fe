import { getAllDepartments, getAllDivisions } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DepartmentTable from './_component/department-table';
import DepartmentHeader from './_component/department-header';
import { Box } from '@mui/material';

const DepartmentPage = async () => {
    const session = await getServerSession(authOptions);
    const [divisions, departments] = await Promise.all([
        getAllDivisions(session?.access_token),
        getAllDepartments(session?.access_token, true)
    ]);

    return (
        <Box sx={{ p: 3 }}>
            <DepartmentHeader
                divisions={divisions?.result}
            />
            <DepartmentTable
                divisions={divisions?.result}
                departments={departments?.result || []}
            />
        </Box>
    );
}

export default DepartmentPage;