import { customFetch } from '@/lib';
import { Assumption } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assumption`;

export const getAllAssumptions = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<Assumption[]>(
            {
                url: `${baseURL}/get-all-assumptions`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching assumptions');
    }
};

export const getAssumptionById = async (assumptionId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Assumption>(
            {
                url: `${baseURL}/${assumptionId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching assumption');
    }
};

export const createAssumption = async (assumptionData: Assumption) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Assumption>(
            {
                url: `${baseURL}/add-assumption`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: assumptionData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error creating assumption');
    }
};

export const updateAssumption = async (assumptionId: string, assumptionData: Assumption) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<Assumption>(
            {
                url: `${baseURL}/update-assumption/${assumptionId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: assumptionData,
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error updating assumption');
    }
};

export const deleteAssumption = async (assumptionId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch(
            {
                url: `${baseURL}/${assumptionId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error deleting assumption');
    }
};

export const restoreAssumption = async (assumptionId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch(
            {
                url: `${baseURL}/restore/${assumptionId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'PATCH',
            }
        );
        return response;
    } catch (error) {
        throw new Error('Error restoring assumption');
    }
};

export const exportAssumptions = async () => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/export-assumptions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error exporting assumptions');
        }

        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'exported_assumptions.xlsx';

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
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error exporting assumptions:', error);
    }
};

export const importAssumptions = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import-assumptions`, {
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
