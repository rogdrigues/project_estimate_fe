
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllPresalePlans, getApproveOpportunities } from '@/services';
import { getServerSession } from 'next-auth';
import { PresalePlanHeader } from './_component/presaleplan-header';
import PresalePlanTable from './_component/presaleplan-table';

const PresalePlanPage = async () => {
    const session = await getServerSession(authOptions);
    const presalePlans = await getAllPresalePlans(session?.access_token, true);
    const approveOpportunities = await getApproveOpportunities(session?.access_token, false, true);
    return (
        <div>
            <PresalePlanHeader
                opportunities={approveOpportunities?.result}
            />
            <PresalePlanTable
                presalePlans={presalePlans?.result || []}
                opportunities={approveOpportunities?.result}
            />
        </div>
    );
}

export default PresalePlanPage;
