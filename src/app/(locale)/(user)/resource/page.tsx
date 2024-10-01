import { getAllResources } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import ResourceHeader from './_component/resource-header';
import ResourceTable from './_component/resource-table';

const ResourcePage = async () => {
    const session = await getServerSession(authOptions);
    const resources = await getAllResources(session?.access_token, true);

    return (
        <div>
            <ResourceHeader />
            <ResourceTable resources={resources?.result || []} />
        </div>
    );
}

export default ResourcePage;
