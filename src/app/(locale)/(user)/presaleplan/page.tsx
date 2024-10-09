import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllPresalePlans, getApproveOpportunities } from '@/services';
import { getServerSession } from 'next-auth';
import { PresalePlanHeader } from './_component/presaleplan-header';
import PresalePlanTable from './_component/presaleplan-table';
import { Box } from '@mui/material';

const PresalePlanPage = async () => {
    const session = await getServerSession(authOptions);
    const [presalePlans, approveOpportunities] = await Promise.all([
        getAllPresalePlans(session?.access_token, true),
        getApproveOpportunities(session?.access_token, false, true)
    ]);

    return (
        <Box sx={{ p: 3 }}>
            <PresalePlanHeader
                opportunities={approveOpportunities?.result}
            />
            <PresalePlanTable
                presalePlans={presalePlans?.result || []}
                opportunities={approveOpportunities?.result}
            />
        </Box>
    );
}

export default PresalePlanPage;