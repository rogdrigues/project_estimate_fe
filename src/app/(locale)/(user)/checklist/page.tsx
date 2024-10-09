import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllCategories } from '@/services';
import { getAllChecklists } from '@/services/checklist';
import { getServerSession } from 'next-auth';
import ChecklistHeader from './_component/checklist-header';
import ChecklistTable from './_component/checklist-table';
import { Box } from '@mui/material';

const ChecklistPage = async () => {
    const session = await getServerSession(authOptions);

    const [categories, checklists] = await Promise.all([
        getAllCategories(session?.access_token),
        getAllChecklists(session?.access_token, true)
    ]);

    return (
        <Box sx={{ p: 3 }}>
            <ChecklistHeader categories={categories?.result} />
            <ChecklistTable checklists={checklists?.result || []} categories={categories?.result} />
        </Box>
    );
}

export default ChecklistPage;
