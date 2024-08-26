import { customFetch } from '@/lib';
import { UserMaster } from '@/types';
import { getAccessToken } from '@/utils';
import { useSession } from 'next-auth/react';
const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;

export const getAllUsers = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/get-all-users`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                method: 'GET'
            }
        );
        console.log("Response", response);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const createUser = async (userData: UserMaster) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<UserMaster>(
            {
                url: `${baseURL}/add-user`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: userData,
            }
        )
        return response.data;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

export const updateUser = async (userId: string, userData: UserMaster) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch(
            {
                url: `${baseURL}/${userId}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: userData,
            }
        )
        return response.data;
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
        return response.data;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};