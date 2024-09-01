import { customFetch } from '@/lib';
import { Department } from '@/types';

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