
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllDepartments, getAllDivisions, getAllPresalePlans, getApproveOpportunities } from '@/services';
import { getServerSession } from 'next-auth';
import { PresalePlanHeader } from './_component/presaleplan-header';
import PresalePlanTable from './_component/presaleplan-table';

const PresalePlanPage = async () => {
    const session = await getServerSession(authOptions);
    const divisions = await getAllDivisions(session?.access_token);
    const departments = await getAllDepartments(session?.access_token);
    const presalePlans = await getAllPresalePlans(session?.access_token, true);
    const approveOpportunities = await getApproveOpportunities(session?.access_token, false, true);

    return (
        <div>
            <PresalePlanHeader
                divisions={divisions?.result}
                departments={departments?.result}
                opportunities={approveOpportunities?.result}
            />
            <PresalePlanTable
                presalePlans={presalePlans?.result || []}
                divisions={divisions?.result}
                departments={departments?.result}
                opportunities={approveOpportunities?.result}
            />
        </div>
    );
}

export default PresalePlanPage;
