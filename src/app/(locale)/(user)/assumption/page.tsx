import { getAllAssumptions, getAllCategories } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import AssumptionTable from './_component/assumption-table';
import AssumptionHeader from './_component/assumption-header';
import { Box } from '@mui/material';

const AssumptionPage = async () => {
    const session = await getServerSession(authOptions);
    const [assumptions, categories] = await Promise.all([
        getAllAssumptions(session?.access_token, true),
        getAllCategories(session?.access_token)
    ]);

    return (
        <Box sx={{ p: 3 }}>
            <AssumptionHeader
                categories={categories?.result}
            />
            <AssumptionTable
                assumptions={assumptions?.result}
                categories={categories?.result}
            />
        </Box>
    );
}

export default AssumptionPage;