import { customFetch } from '@/lib';
import { UserMaster } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;

export const getAllRoles = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/roles`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET'
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching roles');
    }
}

export const getAllUsers = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/get-all-users`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET',
                nextOptions: {
                    cache: 'no-store',
                    tags: ['users']
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const getUser = async (userId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/get-user/${userId}`,
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
        throw new Error('Error fetching users');
    }
};

export const createUser = async (userData: UserMaster, accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster>(
            {
                url: `${baseURL}/add-user`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: userData,
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

export const updateUser = async (userId: string, userData: UserMaster, accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster>(
            {
                url: `${baseURL}/${userId}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: userData,
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};


export const restoreUser = async (userId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/restore/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'DELETE',
            }
        )
        return response;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};

export const importUsersFromExcel = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${baseURL}/import-users`, {
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


export const exportFile = async () => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/export-users`, {
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
        let fileName = 'exported_file.xlsx';

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

export const updateUserProfile = async (profileData: any) => {
    try {
        const formData = new FormData();
        for (const key in profileData) {
            formData.append(key, profileData[key]);
        }
        console.log('formData', formData);
        const accessToken = await getAccessToken();

        const response = await fetch(`${baseURL}/profile`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error updating profile:', error.message);
        throw error;
    }
};