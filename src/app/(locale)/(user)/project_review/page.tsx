
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllProjects } from '@/services';
import { getServerSession } from 'next-auth';
import { ProjectReviewHeader } from './_component/project-review-header';
import ProjectReviewTable from './_component/project-review-table';


const ProjectPage = async () => {
    const session = await getServerSession(authOptions);
    const projects = await getAllProjects(session?.access_token, true, true);

    return (
        <div>
            <ProjectReviewHeader />
            <ProjectReviewTable projects={projects?.result || []} />
        </div>
    );
}

export default ProjectPage;
