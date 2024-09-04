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