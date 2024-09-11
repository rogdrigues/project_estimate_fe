import { customFetch } from '@/lib';
import { Category } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`;

export const getAllCategories = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<Category[]>(
            {
                url: `${baseURL}/get-all-categories`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET'
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories');
    }
};

export const getCategoryById = async (categoryId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Category>(
            {
                url: `${baseURL}/${categoryId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
                nextOptions: {
                    cache: 'no-store',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching category');
    }
};

export const createCategory = async (categoryData: Category) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Category>(
            {
                url: `${baseURL}/add-category`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: categoryData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error creating category');
    }
};

export const updateCategory = async (categoryId: string, categoryData: Category) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Category>(
            {
                url: `${baseURL}/${categoryId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: categoryData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating category');
    }
};

export const deleteCategory = async (categoryId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${categoryId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error deleting category');
    }
};

export const restoreCategory = async (categoryId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/restore/${categoryId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error restoring category');
    }
};

export const importCategories = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import-categories`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 201) {
            const data = await response.json();
            return data;
        } else if (response.status === 200 && response.headers.get('content-type') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const contentDisposition = response.headers.get('content-disposition');
            let fileName = 'imported_file.xlsx';

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if (match && match[1]) {
                    fileName = match[1];
                }
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error uploading the file:', error);
        throw new Error('Error uploading the file');
    }
};

export const exportCategories = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/export-categories`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error exporting file');
        }
        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'exported_categories.xlsx';

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?/);
            if (match && match[1]) {
                fileName = match[1];
            }
        }
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error exporting file:', error);
    }
};
