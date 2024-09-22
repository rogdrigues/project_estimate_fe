'use client';
import { useState } from 'react';
import { CategoryFormModal } from './category-form-modal';
import { deleteCategory, restoreCategory } from '@/services';
import { columns } from '@/app/(locale)/(user)/category/_table_config/category-table-columns';
import { Category } from '@/types';
import TableComponent from '@/components/_table_form-config/table-item-component';

interface IProps {
    categories: Category[];
}

export default function CategoryTable(props: IProps) {
    const { categories } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataView, setDataView] = useState<Category | null>(null);

    return (
        <TableComponent
            rows={categories}
            columns={columns}
            onDelete={deleteCategory}
            onRestore={restoreCategory}
            markWord="category"
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            dataView={dataView}
            setDataView={setDataView}
            initialVisibility={{
                CategoryName: true,
                SubCategory: true,
                status: true,
            }}
            hiddenColumnsOnMobile={['status']}
            currentPage="categories"
        >
            <CategoryFormModal
                open={openUpdate}
                setOpen={setOpenUpdate}
                category={dataView}
            />
        </TableComponent>
    );
}
