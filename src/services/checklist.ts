import { customFetch } from '@/lib';
import { Checklist } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checklist`;

export const getAllChecklists = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<Checklist[]>(
            {
                url: `${baseURL}/get-all?includeDeleted=${includeDeleted}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
                nextOptions: {
                    cache: 'no-store'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching checklists');
    }
};

export const getChecklistById = async (checklistId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Checklist>(
            {
                url: `${baseURL}/${checklistId}`,
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
        throw new Error('Error fetching checklist');
    }
};

export const createChecklist = async (checklistData: Checklist) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Checklist>(
            {
                url: `${baseURL}/create`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: checklistData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error creating checklist');
    }
};

export const updateChecklist = async (checklistId: string, checklistData: Checklist) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Checklist>(
            {
                url: `${baseURL}/${checklistId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: checklistData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating checklist');
    }
};

export const deleteChecklist = async (checklistId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${checklistId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error deleting checklist');
    }
};

export const restoreChecklist = async (checklistId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/restore/${checklistId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'PATCH',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error restoring checklist');
    }
};

export const importChecklists = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import`, {
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
            let fileName = 'imported_checklists.xlsx';

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

export const exportChecklists = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/export`, {
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
        let fileName = 'exported_checklists.xlsx';

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
