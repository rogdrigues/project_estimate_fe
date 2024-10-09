import { getAllResources } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import ResourceHeader from './_component/resource-header';
import ResourceTable from './_component/resource-table';
import { Box } from '@mui/material';

const ResourcePage = async () => {
    const session = await getServerSession(authOptions);
    const resources = await getAllResources(session?.access_token, true);

    return (
        <Box sx={{ p: 3 }}>
            <ResourceHeader />
            <ResourceTable resources={resources?.result || []} />
        </Box>
    );
}

export default ResourcePage;
