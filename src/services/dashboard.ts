import { customFetch } from '@/lib';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`;

export const getWeeklyChangesSummary = async (accessToken: string | undefined) => {
    try {
        const response = await customFetch({
            url: `${baseURL}/summary`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weekly changes summary');
    }
};

export const getOpportunityStatusSummary = async (accessToken: string | undefined) => {
    try {

        const response = await customFetch({
            url: `${baseURL}/opportunity-status`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching opportunity status summary');
    }
};

export const getProjectStatusSummary = async (accessToken: string | undefined) => {
    try {

        const response = await customFetch({
            url: `${baseURL}/project-status`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching project status summary');
    }
};

export const getTemplateStatusSummary = async (accessToken: string | undefined) => {
    try {

        const response = await customFetch({
            url: `${baseURL}/template-status`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            nextOptions: {
                cache: 'no-store',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching template status summary');
    }
};
