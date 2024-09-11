
import { getAllAssumptions, getAllCategories } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import AssumptionTable from './_component/assumption-table';
import AssumptionHeader from './_component/assumption-header';


const AssumptionPage = async () => {
    const session = await getServerSession(authOptions);
    const assumptions = await getAllAssumptions(session?.access_token);
    const categories = await getAllCategories(session?.access_token);

    return (
        <div>
            <AssumptionHeader
                categories={categories?.result}
            />
            <AssumptionTable
                assumptions={assumptions?.result}
                categories={categories?.result}
            />
        </div>
    );
}

export default AssumptionPage;
