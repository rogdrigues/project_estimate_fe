
import { getAllCategories } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import CategoryTable from './_component/category-table';
import CategoryHeader from './_component/category-header';

const CategoryPage = async () => {
    const session = await getServerSession(authOptions);
    const categories = await getAllCategories(session?.access_token, true);

    return (
        <div>
            <CategoryHeader />
            <CategoryTable categories={categories?.result || []} />
        </div>
    );
}

export default CategoryPage;
