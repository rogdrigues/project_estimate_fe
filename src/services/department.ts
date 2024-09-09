import { customFetch } from '@/lib';
import { Department } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department`;

export const getAllDepartments = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<Department[]>(
            {
                url: `${baseURL}/get-all-department`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET'
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const getDepartmentById = async (departmentId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<any>(
            {
                url: `${baseURL}/${departmentId}`,
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
        throw new Error('Error fetching department');
    }
};

export const createDepartment = async (departmentData: any, accessToken: string | undefined) => {
    try {
        const response = await customFetch<any>(
            {
                url: `${baseURL}/add-department`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: departmentData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error creating department');
    }
};

export const updateDepartment = async (departmentId: string, departmentData: any, accessToken: string | undefined) => {
    try {
        const response = await customFetch<any>(
            {
                url: `${baseURL}/${departmentId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: departmentData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating department');
    }
};

export const deleteDepartment = async (departmentId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${departmentId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error deleting department');
    }
};

export const restoreDepartment = async (departmentId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/restore/${departmentId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'PUT',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error restoring department');
    }
};

export const importDepartments = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import-departments`, {
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

export const exportDepartments = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/export-departments`, {
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
        let fileName = 'exported_departments.xlsx';

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