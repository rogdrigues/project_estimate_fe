
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllCategories } from '@/services';
import { getAllChecklists } from '@/services/checklist';
import { getServerSession } from 'next-auth';
import ChecklistHeader from './_component/checklist-header';
import ChecklistTable from './_component/checklist-table';

const ChecklistPage = async () => {
    const session = await getServerSession(authOptions);
    const categories = await getAllCategories(session?.access_token);
    const checklists = await getAllChecklists(session?.access_token, true);

    return (
        <div>
            <ChecklistHeader categories={categories?.result} />
            <ChecklistTable checklists={checklists?.result || []} categories={categories?.result} />
        </div>
    );
}

export default ChecklistPage;
