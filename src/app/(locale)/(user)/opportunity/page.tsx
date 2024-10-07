
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllCategories, getAllDepartments, getAllDivisions, getAllOpportunities, getOppLead } from '@/services';
import { getServerSession } from 'next-auth';
import { OpportunityHeader } from './_component/opportunity-header';
import OpportunityTable from './_component/opportunity-table';

const OpportunityPage = async () => {
    const session = await getServerSession(authOptions);
    const divisions = await getAllDivisions(session?.access_token);
    const departments = await getAllDepartments(session?.access_token);
    const oppLeads = await getOppLead(session?.access_token);
    const opportunities = await getAllOpportunities(session?.access_token, true);
    const categories = await getAllCategories(session?.access_token);

    return (
        <div>
            <OpportunityHeader
                departments={departments?.result}
                opportunityLeads={oppLeads?.result}
                categories={categories?.result}
            />
            <OpportunityTable
                opportunities={opportunities?.result || []}
                divisions={divisions?.result}
                departments={departments?.result}
                opportunityLeads={oppLeads?.result}
                categories={categories?.result}
            />

        </div>
    );
}

export default OpportunityPage;
