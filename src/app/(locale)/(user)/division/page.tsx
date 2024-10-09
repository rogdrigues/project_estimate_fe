
import { getAllDivisions } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DivisionHeader from './_component/division-header';
import DivisionTable from './_component/division-table';
import { Box } from '@mui/material';

const DepartmentPage = async () => {
    const session = await getServerSession(authOptions);
    const divisions = await getAllDivisions(session?.access_token, true);

    return (
        <Box sx={{ p: 3 }}>
            <DivisionHeader />
            <DivisionTable
                divisions={divisions?.result || []}
            />
        </Box>
    );
}

export default DepartmentPage;
