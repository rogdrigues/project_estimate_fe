import { customFetch } from '@/lib';
import { PresalePlan, PresalePlanComment, PresalePlanVersion } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presale`;

export const getAllPresalePlans = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<PresalePlan[]>({
            url: `${baseURL}/get-all-presale?includeDeleted=${includeDeleted}`,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: { cache: 'no-store' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching presale plans');
    }
};

export const getPresalePlanById = async (presalePlanId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlan>({
            url: `${baseURL}/presale-plan/${presalePlanId}`,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: { cache: 'no-store' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching presale plan');
    }
};

export const createPresalePlan = async (presalePlanData: PresalePlan) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlan>({
            url: `${baseURL}/create-presale-plan`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: presalePlanData,
        });
        return response;
    } catch (error) {
        throw new Error('Error creating presale plan');
    }
};

export const updatePresalePlan = async (presalePlanId: string, presalePlanData: PresalePlan) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlan>({
            url: `${baseURL}/update-presale/${presalePlanId}`,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: presalePlanData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating presale plan');
    }
};

export const deletePresalePlan = async (presalePlanId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/delete-presale/${presalePlanId}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        });
        return response;
    } catch (error) {
        throw new Error('Error deleting presale plan');
    }
};

export const restorePresalePlan = async (presalePlanId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/restore-presale/${presalePlanId}`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        });
        return response;
    } catch (error) {
        throw new Error('Error restoring presale plan');
    }
};

// Create Presale Plan Comment
export const createPresalePlanComment = async (commentData: Partial<PresalePlanComment>) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlanComment>({
            url: `${baseURL}/create-presale-comment`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: commentData,
        });
        return response;
    } catch (error) {
        throw new Error('Error adding comment');
    }
};

// Fetch Comments for Presale Plan
export const getPresalePlanComments = async (presalePlanId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlanComment[]>({
            url: `${baseURL}/comments/${presalePlanId}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            nextOptions: { cache: 'no-store' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching comments');
    }
};

// Approve Presale Plan
export const approvePresalePlan = async (presalePlanId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/approve-comment/${presalePlanId}`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        });
        return response;
    } catch (error) {
        throw new Error('Error approving presale plan');
    }
};

// Reject Presale Plan
export const rejectPresalePlan = async (presalePlanId: string, reason: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch({
            url: `${baseURL}/reject-comment/${presalePlanId}`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: { reason },
        });
        return response;
    } catch (error) {
        throw new Error('Error rejecting presale plan');
    }
};


// Create Presale Plan Version
export const createPresalePlanVersion = async (versionData: Partial<PresalePlanVersion>) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlanVersion>({
            url: `${baseURL}/version/create-presale-version`,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: versionData,
        });
        return response;
    } catch (error) {
        throw new Error('Error creating presale plan version');
    }
};

// Fetch Versions for Presale Plan
export const getPresalePlanVersions = async (presalePlanId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlanVersion[]>({
            url: `${baseURL}/versions/list-presale-version/${presalePlanId}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            nextOptions: { cache: 'no-store' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching versions');
    }
};

// Fetch Presale Plan Version by ID
export const fetchPresalePlanVersionById = async (versionId: string) => {
    try {
        const accessToken = await getAccessToken();
        const response = await customFetch<PresalePlanVersion>({
            url: `${baseURL}/version/get-presale-version/${versionId}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            nextOptions: { cache: 'no-store' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching version');
    }
};

export const deletePresalePlanVersion = async (versionId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch({
            url: `${baseURL}/delete/version/${versionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        throw new Error('Error deleting version');
    }
};
