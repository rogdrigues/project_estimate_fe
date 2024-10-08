import React from 'react';
import DashboardOverview from './_components/dashboard-overview';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getOpportunityStatusSummary, getProjectStatusSummary, getTemplateStatusSummary, getWeeklyChangesSummary } from '@/services/dashboard';
import { getAllOpportunities, getAllProjects } from '@/services';

const Dashboard = async () => {
    const session = await getServerSession(authOptions);
    const [dashboardTotal, opportunityStatus, projectStatus, templateStatus, opportunities, projects] = await Promise.all([
        getWeeklyChangesSummary(session?.access_token),
        getOpportunityStatusSummary(session?.access_token),
        getProjectStatusSummary(session?.access_token),
        getTemplateStatusSummary(session?.access_token),
        getAllOpportunities(session?.access_token, true),
        getAllProjects(session?.access_token, true),
    ]);

    return (
        <DashboardOverview
            dashboardTotal={dashboardTotal}
            opportunityStatus={opportunityStatus}
            projectStatus={projectStatus}
            templateStatus={templateStatus}
            opportunities={opportunities}
            projects={projects}
        />
    );
}

export default Dashboard;
