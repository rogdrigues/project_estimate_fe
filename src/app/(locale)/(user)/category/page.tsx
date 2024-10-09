
import { getAllCategories } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import CategoryTable from './_component/category-table';
import CategoryHeader from './_component/category-header';
import { Box } from '@mui/material';

const CategoryPage = async () => {
    const session = await getServerSession(authOptions);
    const categories = await getAllCategories(session?.access_token, true);

    return (
        <Box sx={{ p: 3 }}>
            <CategoryHeader />
            <CategoryTable categories={categories?.result || []} />
        </Box>
    );
}

export default CategoryPage;
