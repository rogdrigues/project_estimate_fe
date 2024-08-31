import { customFetch } from '@/lib';
import { Division } from '@/types';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/division`;

export const getAllDivisions = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch<Division[]>(
            {
                url: `${baseURL}/get-all-division`,
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