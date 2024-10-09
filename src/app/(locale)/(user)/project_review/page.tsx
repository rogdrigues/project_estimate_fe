
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllProjects } from '@/services';
import { getServerSession } from 'next-auth';
import { ProjectReviewHeader } from './_component/project-review-header';
import ProjectReviewTable from './_component/project-review-table';
import { Box } from '@mui/material';


const ProjectPage = async () => {
    const session = await getServerSession(authOptions);
    const projects = await getAllProjects(session?.access_token, true, true);

    return (
        <Box sx={{ p: 3 }}>
            <ProjectReviewHeader />
            <ProjectReviewTable projects={projects?.result || []} />
        </Box>
    );
}

export default ProjectPage;
