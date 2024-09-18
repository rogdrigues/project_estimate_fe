import { customFetch } from '@/lib';
import { Division, UserMaster } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/division`;

export const getAllDivisions = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<Division[]>(
            {
                url: `${baseURL}/get-all-divisions?includeDeleted=${includeDeleted}`,
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
        throw new Error('Error fetching divisions');
    }
};

export const getDivisionUsers = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/division-leads`,
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
        throw new Error('Error fetching divisions');
    }
};

export const getDivisionById = async (divisionId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Division>(
            {
                url: `${baseURL}/${divisionId}`,
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
        throw new Error('Error fetching division');
    }
};

export const createDivision = async (divisionData: Division, accessToken: string | undefined) => {
    try {
        const response = await customFetch<Division>(
            {
                url: `${baseURL}/add-division`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: divisionData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error creating division');
    }
};

export const updateDivision = async (divisionId: string, divisionData: any, accessToken: string | undefined) => {
    try {
        const response = await customFetch<Division>(
            {
                url: `${baseURL}/${divisionId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: divisionData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating division');
    }
};

export const deleteDivision = async (divisionId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${divisionId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error deleting division');
    }
};

export const restoreDivision = async (divisionId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<any>(
            {
                url: `${baseURL}/restore/${divisionId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'PUT',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error restoring division');
    }
};

export const importDivisions = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import-divisions`, {
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

export const exportDivisions = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/export-divisions`, {
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
        let fileName = 'exported_divisions.xlsx';

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
        };
    }
};
