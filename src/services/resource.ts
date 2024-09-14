import { customFetch } from '@/lib';
import { Resource } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resource`;

export const getAllResources = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<Resource[]>({
            url: `${baseURL}/get-all-resources?includeDeleted=${includeDeleted}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching resources');
    }
};

export const getResourceById = async (resourceId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Resource>({
            url: `${baseURL}/${resourceId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching resource');
    }
};

export const createResource = async (resourceData: Resource) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Resource>({
            url: `${baseURL}/add-resource`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: resourceData,
        });
        return response;
    } catch (error) {
        throw new Error('Error creating resource');
    }
};

export const updateResource = async (resourceId: string, resourceData: Resource) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Resource>({
            url: `${baseURL}/${resourceId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: resourceData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating resource');
    }
};

export const deleteResource = async (resourceId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/${resourceId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        throw new Error('Error deleting resource');
    }
};

export const restoreResource = async (resourceId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/restore/${resourceId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'PATCH',
        });
        return response;
    } catch (error) {
        throw new Error('Error restoring resource');
    }
};

export const importResources = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import-resources`, {
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

export const exportResources = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/export-resources`, {
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
        let fileName = 'exported_resources.xlsx';

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
        return {
            EC: 0,
            message: 'File exported successfully',
        };
    } catch (error) {
        return {
            EC: 1,
            message: 'Error exporting file',
            data: error,
        }
    }
};
