
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllCategories, getAllProjects, getAllTemplates, getApproveOpportunities, getReviewers } from '@/services';
import { getServerSession } from 'next-auth';
import { ProjectHeader } from './_component/project-header';
import ProjectTable from './_component/project-table';


const ProjectPage = async () => {
    const session = await getServerSession(authOptions);
    const projects = await getAllProjects(session?.access_token, true);
    const opportunities = await getApproveOpportunities(session?.access_token, false, true);
    const templates = await getAllTemplates(session?.access_token);
    const categories = await getAllCategories(session?.access_token);
    const reviewers = await getReviewers(session?.access_token);

    return (
        <div>
            <ProjectHeader
                categories={categories?.result}
                opportunities={opportunities?.result}
                templates={templates?.result}
                reviewers={reviewers?.result || []}
            />
            <ProjectTable
                projects={projects?.result || []}
                opportunities={opportunities?.result}
                categories={categories?.result}
                templates={templates?.result}
                reviewers={reviewers?.result}
            />
        </div>
    );
}

export default ProjectPage;
