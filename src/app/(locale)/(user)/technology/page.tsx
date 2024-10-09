import { getAllTechnologies } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import TechnologyTable from './_component/technology-table';
import TechnologyHeader from './_component/technology-header';
import { Box } from '@mui/material';

const TechnologyPage = async () => {
    const session = await getServerSession(authOptions);
    const technology = await getAllTechnologies(session?.access_token, true);

    return (
        <Box sx={{ p: 3 }}>
            <TechnologyHeader />
            <TechnologyTable technologies={technology?.result || []} />
        </Box>
    );
}

export default TechnologyPage;
