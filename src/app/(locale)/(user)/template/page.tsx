import { getAllCategories, getAllTemplates } from '@/services';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import TemplateHeader from './_component/template-header';
import TemplateTable from './_component/template-table';


const TemplatePage = async () => {
    const session = await getServerSession(authOptions);
    const templates = await getAllTemplates(session?.access_token, true);
    const categories = await getAllCategories(session?.access_token);
    console.log(templates);
    return (
        <div>
            <TemplateHeader categories={categories?.result} />
            <TemplateTable templates={templates?.result || []} categories={categories?.result} />
        </div>
    );
}

export default TemplatePage;
