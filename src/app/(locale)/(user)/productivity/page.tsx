import { getAllProductivities, getAllTechnologies } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import ProductivityHeader from './_component/productivity-header';
import ProductivityTable from './_component/productivity-table';

const ProductivityPage = async () => {
    const session = await getServerSession(authOptions);
    const [productivities, technologies] = await Promise.all([
        getAllProductivities(session?.access_token, true),
        getAllTechnologies(session?.access_token)
    ]);

    return (
        <div>
            <ProductivityHeader technologies={technologies?.result} />
            <ProductivityTable productivities={productivities?.result || []} technologies={technologies?.result} />
        </div>
    );
}

export default ProductivityPage;