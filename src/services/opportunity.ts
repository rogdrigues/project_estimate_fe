import { customFetch } from '@/lib';
import { Opportunity, OpportunityVersion, UserMaster } from '@/types';
import { getAccessToken } from '@/utils';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/opportunity`;

export const getAllOpportunities = async (accessToken: string | undefined, includeDeleted: boolean = false) => {
    try {
        const response = await customFetch<Opportunity[]>({
            url: `${baseURL}/list?includeDeleted=${includeDeleted}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: {
                cache: 'no-store',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching opportunities');
    }
};

export const getOppLead = async (accessToken: string | undefined) => {
    try {

        const response = await customFetch<UserMaster[]>(
            {
                url: `${baseURL}/opportunity-leads`,
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
        throw new Error('Error fetching opportunity leads');
    }
};

export const getOpportunityById = async (opportunityId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Opportunity>({
            url: `${baseURL}/${opportunityId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: {
                cache: 'no-store',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching opportunity');
    }
};

export const getLastVersionForOpportunity = async (opportunityId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<OpportunityVersion>({
            url: `${baseURL}/${opportunityId}/latest-version`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'GET',
            nextOptions: {
                cache: 'no-store',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching opportunity');
    }
};

export const createOpportunity = async (opportunityData: Opportunity) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Opportunity>({
            url: `${baseURL}/create`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: opportunityData,
        });
        return response;
    } catch (error) {
        throw new Error('Error creating opportunity');
    }
};

export const updateOpportunity = async (opportunityId: string, opportunityData: Opportunity) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch<Opportunity>({
            url: `${baseURL}/update/${opportunityId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: opportunityData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating opportunity');
    }
};

export const deleteOpportunity = async (opportunityId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch({
            url: `${baseURL}/delete/${opportunityId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        throw new Error('Error deleting opportunity');
    }
};

export const restoreOpportunity = async (opportunityId: string) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch({
            url: `${baseURL}/restore/${opportunityId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            method: 'PUT',
        });
        return response;
    } catch (error) {
        throw new Error('Error restoring opportunity');
    }
};

export const updateApprovalStatus = async (opportunityId: string, approvalData: { approvalStatus: string; comment?: string }) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch({
            url: `${baseURL}/approve/${opportunityId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: approvalData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating approval status');
    }
};

export const updateOpportunityAfterRejection = async (opportunityId: string, updatedData: Opportunity) => {
    try {
        const accessToken = await getAccessToken();

        const response = await customFetch({
            url: `${baseURL}/update-rejection/${opportunityId}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            body: updatedData,
        });
        return response;
    } catch (error) {
        throw new Error('Error updating opportunity after rejection');
    }
};