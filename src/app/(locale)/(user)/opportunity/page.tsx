import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllCategories, getAllDepartments, getAllDivisions, getAllOpportunities, getOppLead } from '@/services';
import { getServerSession } from 'next-auth';
import { OpportunityHeader } from './_component/opportunity-header';
import OpportunityTable from './_component/opportunity-table';
import { Box } from '@mui/material';

const OpportunityPage = async () => {
    const session = await getServerSession(authOptions);
    const [divisions, departments, oppLeads, opportunities, categories] = await Promise.all([
        getAllDivisions(session?.access_token),
        getAllDepartments(session?.access_token),
        getOppLead(session?.access_token),
        getAllOpportunities(session?.access_token, true),
        getAllCategories(session?.access_token)
    ]);

    return (
        <Box sx={{ p: 3 }}>
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
        </Box>
    );
}

export default OpportunityPage;
