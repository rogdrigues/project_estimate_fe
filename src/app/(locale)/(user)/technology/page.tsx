import { getAllTechnologies } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import TechnologyTable from './_component/technology-table';
import TechnologyHeader from './_component/technology-header';

const TechnologyPage = async () => {
    const session = await getServerSession(authOptions);
    const technology = await getAllTechnologies(session?.access_token, true);

    console.log(technology);

    return (
        <div>
            <TechnologyHeader />
            <TechnologyTable technologies={technology?.result} />
        </div>
    );
}

export default TechnologyPage;
